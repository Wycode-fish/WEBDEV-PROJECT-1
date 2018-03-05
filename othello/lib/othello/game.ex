defmodule Othello.Game do

  # A Game is a map with the following keys:
  #  - :name - the name of the game
  #  - :host - the name of the user who's currently drawing
  #  - :word - the word to be drawn

  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def put(gname, game) do
    Agent.update(__MODULE__, &Map.put(&1, gname, game))
    game
  end

  def get(gname) do
    Agent.get(__MODULE__, &Map.get(&1, gname))
  end

  def join(gname, user) do
    game = get(gname)

    if game do
      state = Map.get(game, :state);
      IO.puts "~~~~~~~~~~~~~~~~~";
      # IO.inspect state;
      IO.inspect Map.get(state, "player2")
      IO.inspect Map.get(state, :player2)
      if Map.get(state, "player2")=="" do
        IO.puts "***************** player2 null";
        state = state|>Map.put(:player2, user);
        game = game|>Map.put(:state, state);
        put(gname, game);
      else
        IO.puts "vvvvvvvvvvvvvvvvv player2 not null";
        put(gname, game);
      end
    else
      game = %{ name: gname, host: user, state: init_state() }
      state = Map.get(game, :state)|>Map.put(:player1, user);
      game = game|>Map.put(:state, state);
      put(gname, game)
    end
  end

  def init_state do
      %{
        availables: [ [5, 4, 3, 4], [3, 2, 3, 4], [2, 3, 4 ,3], [4, 5, 4, 3] ],
        tiles: [0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,2,1,0,0,0,
                0,0,0,1,2,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0],
        current: 1,
        blackScore: 2,
        whiteScore: 2,
        player1: "",
        player2: "",
      }

  end
end
