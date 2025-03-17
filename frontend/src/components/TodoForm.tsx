import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { addTodo } from "../store/todoSlice";

export default function TodoForm() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");

  const mutation = useMutation({
    mutationFn: async (title: string) => {
      const response = await api.post("/todos/", { title, completed: false });
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(addTodo(data));
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo(""); // Clear input field
    },
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      mutation.mutate(newTodo);
    }
  };

  return (
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
        disabled={mutation.status === "pending"}
      >
        {mutation.status === "pending" ? "Adding..." : "Add Todo"}
      </button>
    </div>
  );
}
