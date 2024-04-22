"use client";
import React, { useState } from "react";
import { archiveSingleTodo } from "@/app/lib/action";

function ArchiveButton({ todoId }: { todoId: string }) {
  const [isArchiving, setisArchiving] = useState(false);
  const [archiveSuccessful, setArchiveSuccessful] = useState(false);

  const handleArchive = async () => {
    setisArchiving(true);
    try {
      const result = await archiveSingleTodo({ id: todoId });
      if (result === true) {
        setArchiveSuccessful(true);
      } else {
        setisArchiving(false);
        // Handle the case where deletion was not successful
      }
    } catch (error) {
      console.error("Failed to archive:", error);
      setisArchiving(false);
    }
  };

  return (
    <button
      onClick={handleArchive}
      disabled={isArchiving || archiveSuccessful}
      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      {archiveSuccessful
        ? "Archived"
        : isArchiving
        ? "Archiving..."
        : "Click to Archive"}
    </button>
  );
}

export default ArchiveButton;
