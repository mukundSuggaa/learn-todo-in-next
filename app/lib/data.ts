// to fetch all data
// not a server action
import { sql } from "@vercel/postgres";
import { Todo } from "./definition";
export async function fetchTodos() {
  try {
    const data = await sql<Todo>`select * from todos`;
    return data.rows;
  } catch (error) {
    console.error("Failed to fetch todo:", error);
    throw new Error("Failed to fetch todos data.");
  }
}
