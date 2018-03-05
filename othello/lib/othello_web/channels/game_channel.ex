defmodule OthelloWeb.GameChannel do
  use OthelloWeb, :channel
  alias Othello.Game
  alias Phoenix.Socket

  def join("game:" <> gname, payload, socket) do
    game = Game.get(gname)
    state = game|>Map.get(:state);
    IO.inspect(game)
    if authorized?(payload) do
      socket = socket
      |> Socket.assign(:name, gname)
      |> Socket.assign(:user, payload["user"])
      # broadcast socket, "chess", state
      {:ok, %{ "game" => game}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("chess", %{"state" => state}, socket) do
    IO.puts("broadcsat!!!!!!!")
    IO.inspect(state)
    gname = socket.assigns[:name]
    user  = socket.assigns[:user]
    game =  %{ name: gname, host: user, state: state }
    Game.put(gname, game)
    cond do
      is_nil(user) ->
        IO.inspect {"invalid user", socket.assigns[:user]}
        {:reply, {:ok, %{}}, socket}
      is_nil(game) ->
        IO.inspect {"invalid game", socket.assigns[:name]}
        {:reply, {:ok, %{}}, socket}
      true ->
        broadcast socket, "chess", state
        {:reply, {:ok, %{}}, socket}
    end
  end
  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
