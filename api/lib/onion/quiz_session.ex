defmodule Onion.QuizSession do
  use GenServer, restart: :temporary

  defmodule State do
    defstruct quiz_id: "", users: [], inviteMap: %{}
  end

  #################################################################################
  # REGISTRY AND SUPERVISION BOILERPLATE

  defp via(user_id), do: {:via, Registry, {Onion.QuizSessionRegistry, user_id}}

  defp cast(user_id, params), do: GenServer.cast(via(user_id), params)
  defp call(user_id, params), do: GenServer.call(via(user_id), params)

  def start_supervised(initial_values) do
    callers = [self() | Process.get(:"$callers", [])]

    case DynamicSupervisor.start_child(
           Onion.QuizSessionDynamicSupervisor,
           {__MODULE__, Keyword.merge(initial_values, callers: callers)}
         ) do
      {:error, {:already_started, pid}} -> {:ignored, pid}
      error -> error
    end
  end

  def child_spec(init), do: %{super(init) | id: Keyword.get(init, :quiz_id)}

  def count, do: Registry.count(Onion.QuizSessionRegistry)
  def lookup(quiz_id), do: Registry.lookup(Onion.QuizSessionRegistry, quiz_id)

  ###############################################################################
  ## INITIALIZATION BOILERPLATE

  def start_link(init) do
    IO.puts("quiz session starting: " <> init[:quiz_id])
    GenServer.start_link(__MODULE__, init, name: via(init[:quiz_id]))
  end

  def init(init) do
    # adopt callers from the call point.
    Process.put(:"$callers", init[:callers])

    # also launch a linked, supervised room.
    # Onion.RoomChat.start_link_supervised(init[:room_id])
    {:ok, struct(State, init)}
  end

  ########################################################################
  ## API

  def ws_fan(users, msg) do
    Enum.each(users, fn uid ->
      Onion.UserSession.send_ws(uid, nil, msg)
    end)
  end

  def get(quiz_id, key), do: call(quiz_id, {:get, key})

  defp get_impl(key, _reply, state) do
    {:reply, Map.get(state, key), state}
  end

  def get_maps(quiz_id), do: call(quiz_id, :get_maps)

  defp get_maps_impl(_reply, state) do
    {:reply, {}, state}
  end

  def redeem_invite(room_id, user_id), do: call(room_id, {:redeem_invite, user_id})

  defp redeem_invite_impl(user_id, _reply, state) do
    reply = if Map.has_key?(state.inviteMap, user_id), do: :ok, else: :error

    {:reply, reply, %{state | inviteMap: Map.delete(state.inviteMap, user_id)}}
  end

  def broadcast_ws(quiz_id, msg), do: cast(quiz_id, {:broadcast_ws, msg})

  defp broadcast_ws_impl(msg, state) do
    ws_fan(state.users, msg)
    {:noreply, state}
  end

  def create_invite(quiz_id, user_id, user_info) do
    cast(quiz_id, {:create_invite, user_id, user_info})
  end

  defp create_invite_impl(user_id, user_info, state) do
    Onion.UserSession.send_ws(
      user_id,
      nil,
      %{
        op: "invitation_to_quiz",
        d:
          Map.merge(
            %{roomId: state.quiz_id},
            user_info
          )
      }
    )

    {:noreply,
     %{
       state
       | inviteMap: Map.put(state.inviteMap, user_id, true)
     }}
  end

  def join_quiz(quiz_id, user_id, opts \\ []) do
    cast(quiz_id, {:join_quiz, user_id, opts})
  end

  defp join_quiz_impl(user_id, opts, state) do
    # Onion.RoomChat.add_user(state.room_id, user_id)

    unless opts[:no_fan] do
      ws_fan(state.users, %{
        op: "new_user_join_quiz",
        d: %{
          user: Beef.Users.get_by_id(user_id),
          quizId: state.quiz_id
        }
      })
    end

    {:noreply,
     %{
       state
       | users: [
           # maybe use a set
           user_id
           | Enum.filter(state.users, fn uid -> uid != user_id end)
         ]
     }}
  end

  def destroy(quiz_id, user_id), do: cast(quiz_id, {:destroy, user_id})

  defp destroy_impl(user_id, state) do
    users = Enum.filter(state.users, fn uid -> uid != user_id end)

    ws_fan(users, %{
      op: "quiz_destroyed",
      d: %{quizId: state.quiz_id}
    })

    {:stop, :normal, state}
  end

  def kick_from_quiz(quiz_id, user_id), do: cast(quiz_id, {:kick_from_quiz, user_id})

  defp kick_from_quiz_impl(user_id, state) do
    users = Enum.filter(state.users, fn uid -> uid != user_id end)

    # Onion.RoomChat.remove_user(state.room_id, user_id)

    ws_fan(users, %{
      op: "user_left_quiz",
      d: %{userId: user_id, quizId: state.quiz_id, kicked: true}
    })

    {:noreply,
     %{
       state
       | users: users
     }}
  end

  def leave_quiz(quiz_id, user_id), do: cast(quiz_id, {:leave_quiz, user_id})

  defp leave_quiz_impl(user_id, state) do
    users = Enum.reject(state.users, &(&1 == user_id))

    # Onion.RoomChat.remove_user(state.room_id, user_id)

    ws_fan(users, %{
      op: "user_left_quiz",
      d: %{userId: user_id, quizId: state.quiz_id}
    })

    new_state = %{
      state
      | users: users
    }

    # terminate quiz if it's empty
    case new_state.users do
      [] ->
        {:stop, :normal, new_state}

      _ ->
        {:noreply, new_state}
    end
  end

  ########################################################################
  ## ROUTER

  def handle_call({:get, key}, reply, state), do: get_impl(key, reply, state)

  def handle_call(:get_maps, reply, state), do: get_maps_impl(reply, state)

  def handle_call({:redeem_invite, user_id}, reply, state) do
    redeem_invite_impl(user_id, reply, state)
  end

  def handle_cast({:kick_from_quiz, user_id}, state) do
    kick_from_quiz_impl(user_id, state)
  end

  def handle_cast({:broadcast_ws, msg}, state) do
    broadcast_ws_impl(msg, state)
  end

  def handle_cast({:create_invite, user_id, user_info}, state) do
    create_invite_impl(user_id, user_info, state)
  end

  def handle_cast({:join_quiz, user_id, opts}, state) do
    join_quiz_impl(user_id, opts, state)
  end

  def handle_cast({:destroy, user_id}, state) do
    destroy_impl(user_id, state)
  end

  def handle_cast({:leave_quiz, user_id}, state) do
    leave_quiz_impl(user_id, state)
  end
end
