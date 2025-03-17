import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
