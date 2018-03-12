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

  def get_rooms do
    room_name_list = Agent.get(__MODULE__, &(&1))
                      |> Map.keys
    list_to_key_value_pair(room_name_list);
  end

  def get_available_rooms do
    all_rooms = Agent.get(__MODULE__, &(&1))|>Map.values();
    available_rooms = Enum.filter(all_rooms, fn(x) -> x|>Map.get(:state)|>Map.get("player2") == "" end)
    room_name_list = Enum.map(available_rooms, &(Map.get(&1,:name)))
    # IO.puts "^^^^^^^^^^^^^^^^^"
    # IO.inspect list_to_key_value_pair(room_name_list);
    list_to_key_value_pair(room_name_list);
  end

  def get_busy_rooms do
    all_rooms = Agent.get(__MODULE__, &(&1))|>Map.values();
    available_rooms = Enum.filter(all_rooms, fn(x) -> x|>Map.get(:state)|>Map.get("player2") != "" end)
    room_name_list = Enum.map(available_rooms, &(Map.get(&1,:name)))
    # IO.puts "^^^^^^^^^^^^^^^^^"
    # IO.inspect list_to_key_value_pair(room_name_list);
    list_to_key_value_pair(room_name_list);
  end

  def list_to_key_value_pair(lst) do
    lst = lst|>Enum.map(fn(x) -> {x, x} end);
    map = for {key, val} <- lst, into: %{}, do: {String.to_atom(key), val}
    map|>Map.to_list();
  end

  def join(gname, user) do
    game = get(gname)

    if game do
      game
    else
      game = %{ name: gname, host: user, state: init_state() }
      put(gname, game)
    end
  end
  # def join(gname, user) do
  #   game = get(gname)
  #
  #   if game do
  #     state = Map.get(game, :state);
  #     if Map.get(state, "player2")=="" do
  #       IO.puts "***************** player2 null";
  #       state = state|>Map.put(:player2, user);
  #       info = Map.get(state, "info")
  #       single_info = user <> " enter thr room"
  #       info = List.insert_at(info, -1, single_info)
  #       IO.puts "~~~~~~~~~~~~~~~~~";
  #       IO.inspect info
  #       IO.puts "~~~~~~~~~~~~~~~~~";
  #       state = state|>Map.put(:info, info)
  #       game = game|>Map.put(:state, state);
  #       put(gname, game);
  #     else
  #       put(gname, game);
  #     end
  #   else
  #     game = %{ name: gname, host: user, state: init_state() }
  #     state = Map.get(game, :state)|>Map.put(:player1, user)|>Map.put(:info, [user<>" enter the room"])
  #     game = game|>Map.put(:state, state);
  #     put(gname, game)
  #   end
  # end

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
