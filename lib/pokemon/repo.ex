defmodule Pokemon.Repo do
  use Ecto.Repo,
    otp_app: :pokemon,
    adapter: Ecto.Adapters.Postgres
end
