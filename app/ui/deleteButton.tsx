"use client";
import React, { useState } from "react";
import { deleteSingleTodo } from "@/app/lib/action";

function DeleteButton({ todoId }: { todoId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteSingleTodo({ id: todoId });
      if (result === true) {
        setDeleteSuccessful(true);
      } else {
        setIsDeleting(false);
        // Handle the case where deletion was not successful
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting || deleteSuccessful}
      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      {deleteSuccessful ? "Deleted" : isDeleting ? "Deleting…" : "Delete"}
    </button>
  );
}

export default DeleteButton;
