import TodoList from "@/components/Todo/TodoList";
export default function TodosPage() {
  return (
    <main>
      <h1 className="text-center text-7xl text-red-600 font-thin py-6">
        todos
      </h1>
      <TodoList />
    </main>
  );
}
