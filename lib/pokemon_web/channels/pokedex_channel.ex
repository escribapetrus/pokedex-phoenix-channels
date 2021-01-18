defmodule PokemonWeb.PokedexChannel do
  use PokemonWeb, :channel
  alias Pokemon.Pokedex

  @impl true
  def join("pokedex:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("pokemon_search", %{"body" => body}, socket) do
    case Pokedex.search(body) do
      {:ok, result} ->
        {:ok, result} = Jason.encode(result)
        {:reply, {:ok, %{from: "pokedex", body: result}}, socket}
      {:error, reason} ->
        {:reply, {:error, reason}, socket}
    end
  end

  def handle_in("pokemon_evolve", %{"body" => body}, socket) do
    case Pokedex.evolution_of(body) do
      {:ok, result} ->
        {:ok, result} = Jason.encode(result)
        {:reply, {:ok, %{from: "pokedex", body: result}}, socket}
      {:error, reason} ->
        {:reply, {:error, reason}, socket}
    end
  end

  def handle_in("clear_pokedex", _payload, socket) do
    {:reply, {:ok, %{from: "pokedex", body: "clear pokedex"}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (pokedex:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
