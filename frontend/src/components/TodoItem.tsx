import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { deleteTodo, updateTodo } from "../store/todoSlice";

interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoItem({ id, title, completed }: TodoProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Delete To-Do
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      dispatch(deleteTodo(id));
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Toggle Completion
  const toggleMutation = useMutation({
    mutationFn: async () => {
      await api.put(`/todos/${id}`, { title, completed: !completed });
    },
    onSuccess: () => {
      dispatch(updateTodo({ id, title, completed: !completed }));
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <li className="border-b p-2 flex justify-between items-center">
      <span
        onClick={() => toggleMutation.mutate()}
        className={`cursor-pointer ${
          completed ? "text-green-600" : "text-gray-500"
        }`}
      >
        {completed ? "✅" : "❌"} {title}
      </span>
      <div>
        <button
          onClick={() => deleteMutation.mutate()}
          className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
