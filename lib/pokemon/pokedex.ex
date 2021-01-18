defmodule Pokemon.Pokedex do
  import HTTPoison, only: [get: 1]

  @api "https://pokeapi.co/api/v2/pokemon/"

  def search(id) when is_integer(id) do
    id |> to_string() |> search()
  end
  def search(name) do
    {:ok, %HTTPoison.Response{body: body, status_code: status_code}} = get(@api<>name)
    case status_code do
      200 ->
        Jason.decode(body)
      404 ->
        {:error, %{message: "pokemon not found"}}
    end
  end

  def evolution_of(id) when is_integer(id) do
    id |> to_string() |> evolution_of()
  end
  def evolution_of(name) do
    {:ok, %HTTPoison.Response{body: body, status_code: status_code}} = get(@api <> name)
    case status_code do
      200 ->
        {:ok, %{"species" => %{"url" => url}}} = Jason.decode(body)
        {:ok, %HTTPoison.Response{body: body}} = get(url)
        {:ok, %{"evolution_chain" => %{"url" => url}}} = Jason.decode(body)
        {:ok, %HTTPoison.Response{body: body}} = get(url)
        Jason.decode(body)
      404 ->
        {:error, %{message: "pokemon not found"}}
    end
  end

end
