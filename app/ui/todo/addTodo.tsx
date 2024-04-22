import { insertSingleTodo } from "@/app/lib/action";
import AddButton from "../addButton";
export async function AddTodo() {
  return (
    <form action={insertSingleTodo}>
      <input type="text" name="description" id="description" />
      <AddButton />
    </form>
  );
}
