import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";
import { setTodos } from "../store/todoSlice";
import { RootState } from "../store/store";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await api.get("/todos/");
      dispatch(setTodos(response.data));
      return response.data;
    },
  });

  return (
    <ul className="list-none">
      {todos.length === 0 ? (
        <p className="text-gray-500">No to-dos yet.</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
      )}
    </ul>
  );
}
