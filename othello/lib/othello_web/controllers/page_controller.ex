defmodule OthelloWeb.PageController do
  use OthelloWeb, :controller
  alias Othello.Game

  def index(conn, _params) do
    rooms = Game.get_rooms()
    render conn, "index.html", rooms: rooms
  end
end
