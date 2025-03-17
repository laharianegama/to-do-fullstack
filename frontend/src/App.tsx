import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 w-full max-w-lg bg-gray-800 rounded-lg shadow-lg">
        <h1 className="bg-red-500 text-3xl font-bold text-center mb-6">
          To-Do List
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
