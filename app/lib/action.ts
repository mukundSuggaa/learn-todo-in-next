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
export async function archiveSingleTodo({ id }: { id: string }) {
  try {
    if (!id) {
      return false;
    }
    // parse it using zod schema
    const query = `select * from todos where id=${id}`;
    console.log("id to delte:", id, " \n query:", query);
    const data = await sql<Todo>`select * from todos where id=${id}`;
    if (!data.rows.length) {
      console.log("[NOTFOUNDERROR]:no such id found");
      return false;
    }
    const res = await sql`UPDATE TODOS SET status='archived' WHERE id=${id}`;
    console.log("result:", res);
    // remove router cache, trigger fetching of todo list again
    revalidatePath("/todo");
    // redirect("/todo");
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function markDoneSingleTodo({
  id,
}: {
  id: string;
}): Promise<Boolean> {
  try {
    const data = await sql<Todo>`select * from todos where id=${id}`;
    if (!data.rows.length) {
      console.log("[NOTFOUNDERROR]:no such id found");
      return false;
    }
    await sql`UPDATE TODOS SET status='done' WHERE id=${id}`;
    // remove router cache, trigger fetching of todo list again
    revalidatePath("/todo");
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
}
