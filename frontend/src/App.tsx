import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./api/api";
import { setTodos, addTodo } from "./store/todoSlice";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from the backend
  const { isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await api.get("/todos/");
      dispatch(setTodos(response.data));
      return response.data;
    },
  });

  // Mutation for adding a new todo
  const mutation = useMutation({
    mutationFn: async (title: string) => {
      const response = await api.post("/todos/", { title, completed: false });
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(addTodo(data)); // Update Redux store
      queryClient.invalidateQueries(["todos"]); // Refresh todo list
      setNewTodo(""); // Clear input field
    },
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      mutation.mutate(newTodo);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>

      {/* Add To-Do Form */}
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter new to-do..."
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Todo"}
        </button>
      </div>

      {/* Display To-Do List */}
      <ul className="list-none">
        {todos.map((todo) => (
          <li key={todo.id} className="border-b p-2 flex justify-between">
            <span>{todo.title}</span>
            <span
              className={todo.completed ? "text-green-600" : "text-gray-500"}
            >
              {todo.completed ? "✅" : "❌"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
