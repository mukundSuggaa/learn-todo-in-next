"use server";
import { z } from "zod";
import { db, sql, VercelPoolClient } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { Todo } from "./definition";
import { redirect } from "next/navigation";

const TodoFormSchema = z.object({
  id: z.string(),
  description: z.string(),
});
const CreateTodo = TodoFormSchema.omit({ id: true });

export async function insertSingleTodo(formData: FormData) {
  try {
    // parse it using zod schema
    const { description } = CreateTodo.parse({
      description: formData.get("description") as string,
    });
    await sql`INSERT INTO TODOS(description) VALUES(${description})`;
    // remove router cache, trigger fetching of todo list again
    revalidatePath("/todo");
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param formData
 */
export async function deleteSingleTodo({ id }: { id: string }) {
  try {
    if (!id) {
      return;
    }
    // parse it using zod schema
    const query = `select * from todos where id=${id}`;
    console.log("id to delte:", id, " \n query:", query);
    const data = await sql<Todo>`select * from todos where id=${id}`;
    if (!data.rows.length) {
      console.log("[NOTFOUNDERROR]:no such id found");
      return;
    }
    const res = await sql`DELETE FROM TODOS WHERE id=${id}`;
    console.log("result:", res);
    // remove router cache, trigger fetching of todo list again
    revalidatePath("/todo");
    redirect("/dashboard/todos");
    return true;
  } catch (error) {
    console.log(error);
  }
}

// export async function deleteSingleTodo(formData: FormData) {
//   try {
//     const id = formData.get("id") as string;
//     if (!id) {
//       return;
//     }
//     const data = await sql<Todo>`select * from todos where id='${id}'`;
//     if (!data.rows.length) {
//       return;
//     }
//     await sql`DELETE FROM TODOS WHERE id=${id}`;
//     // remove router cache, trigger fetching of todo list again
//     revalidatePath("/dashboard/todos");
//   } catch (error) {
//     console.log(error);
//   }
// }
