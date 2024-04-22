// import clsx from "clsx";
import { Todo } from "@/app/lib/definition";
import ArchiveButton from "../archiveButton";
import DoneButton from "../doneButton";
export default async function TodoList({ todolist }: { todolist: Todo[] }) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Latest Todos</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {/* <form action=""> */}
          {todolist.map((todo, i) => {
            return (
              <div
                key={todo.id}
                // className={"flex flex-row items-center justify-between py-4"}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncatetext-sm font-semibold md:text-base text-black">
                      {todo.description}
                    </p>
                    <DoneButton todoId={todo.id} />
                    <ArchiveButton todoId={todo.id} />
                  </div>
                </div>
              </div>
            );
          })}
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
