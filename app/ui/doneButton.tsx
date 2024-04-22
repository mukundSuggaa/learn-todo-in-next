"use client";
import React, { useState } from "react";
import { markDoneSingleTodo } from "@/app/lib/action";

function DoneButton({ todoId }: { todoId: string }) {
  const [isDone, setisDone] = useState(false);
  const [doneSuccessful, setdoneSuccessful] = useState(false);

  const handleDone = async () => {
    setisDone(true);
    try {
      const result = await markDoneSingleTodo({ id: todoId });
      if (result === true) {
        setdoneSuccessful(true);
      } else {
        setisDone(false);
        // Handle the case where deletion was not successful
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      setisDone(false);
    }
  };

  return (
    <button
      onClick={handleDone}
      disabled={isDone || doneSuccessful}
      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      {doneSuccessful ? "Done" : isDone ? "Loading..." : "Mark as Done"}
    </button>
  );
}

export default DoneButton;
