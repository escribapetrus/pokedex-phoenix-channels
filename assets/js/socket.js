import {Socket} from "phoenix"

import {renderPokemon, renderEvolutions, handleError, clearPokedex} from "./pokedex.js"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/3" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket, _connect_info) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, connect to the socket:
socket.connect()

let channel = socket.channel("pokedex:lobby", {}),
    search = document.querySelector("#pokemon-search"),
    searchButton = document.querySelector("#search-button"),
    clearButton = document.querySelector("#clear-button"),
    evolveButton = document.querySelector("#pokemon-evolve");

search.addEventListener("keypress", e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchPokemon(search.value);
  }
});

searchButton.addEventListener("click", () => {
  searchPokemon(search.value);
});

clearButton.addEventListener("click", () => {
  channel
  .push("clear_pokedex", {})
  .receive("ok", res => {
    console.log(res);
    clearPokedex();
  })
})

evolveButton.addEventListener("click", () => {
  let activePokemon = document.querySelector("#pokemon-name").innerText.toLowerCase()

  channel
  .push("pokemon_evolve", {body: activePokemon})
  .receive("ok", res => {
    let {chain} = JSON.parse(res.body)
    renderEvolutions(chain)

    let evoBox = document.querySelector("#pokemon-evolutions"),
        evo = document.querySelectorAll("li");
        evo.forEach(e => {
          e.addEventListener("click", (ev) => searchPokemon(ev.target.innerText))
        })
  })
  .receive("error", reason => console.log(reason))
})

channel.join()
  .receive("ok", res => { console.log("Joined successfully", res) })
  .receive("error", res => { console.log("Unable to join", res) })

function searchPokemon(name){
  channel
  .push("pokemon_search", {body: name})
  .receive("ok", res => {
    let body = JSON.parse(res.body)
    renderPokemon(body)
  })
  .receive("error", reason => {
    handleError(reason)
  })
  search.value = "";
}

export default socket