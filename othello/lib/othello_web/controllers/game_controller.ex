defmodule OthelloWeb.GameController do
  use OthelloWeb, :controller
  alias Othello.Game

  def show(conn, %{"gname" => gname}) do
    user = get_session(conn, :user)
    IO.puts "------xx------"
    IO.inspect conn;
    game = Game.get(gname)

    state = game[:state]
    player1 = Map.get(state, "player1");
    player2 = Map.get(state, "player2");
    curr = Map.get(state, "current");

    # # curr_player = (curr==1)? player1:player2;
    # if (curr==1) do
    #   curr = player1;
    # else
    #   curr = player2;
    # end
    #
    # if (curr==user) do
    #
    # end
    host = (user == game[:host])

    if !is_nil(user) and !is_nil(game) do
      render conn, "show.html", user: user, host: host, game: gname, state: game[:state]
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
