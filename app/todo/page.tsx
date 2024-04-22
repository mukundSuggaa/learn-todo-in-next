import { fetchTodos } from "../lib/data";
import { AddTodo } from "../ui/todo/addTodo";
import TodoList from "../ui/todo/todolist";

export default async function Page() {
  const todolist = await fetchTodos();
  return (
    <div>
      <h1>Todos</h1>
      <TodoList todolist={todolist} />
      <AddTodo />
    </div>
  );
}
