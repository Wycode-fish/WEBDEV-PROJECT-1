defmodule OthelloWeb.GameController do
  use OthelloWeb, :controller
  alias Othello.Game

  def show(conn, %{"gname" => gname}) do
    IO.puts "hhhhhhhhhh"
    IO.inspect gname;
    user = get_session(conn, :user)
    game = Game.get(gname)
    host = (user == game[:host])

    if !is_nil(user) and !is_nil(game) do
      IO.puts "------------"
      IO.inspect user
      render conn, "show.html", user: user, host: host, game: gname, word: game[:word]
    else
      conn
      |> put_flash(:error, "Bad user or game chosen")
      |> redirect(to: "/")
    end
  end

  def join(conn, %{"join_data" => join}) do


    game = Game.join(join["game"], join["user"])

    conn
    |> put_session(:user, join["user"])
    |> redirect(to: "/g/" <> join["game"])
  end
end
