defmodule OthelloWeb.GameChannel do
  use OthelloWeb, :channel
  alias Othello.Game
  alias Phoenix.Socket

  def join("game:" <> gname, payload, socket) do
    game = Game.get(gname)
    IO.inspect(game)
    if authorized?(payload) do
      socket = socket
      |> Socket.assign(:name, gname)
      |> Socket.assign(:user, payload["user"])
      {:ok, %{ "game" => game}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client


  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
