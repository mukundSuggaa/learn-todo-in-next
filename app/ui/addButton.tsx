"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function AddButton() {
  const { pending } = useFormStatus();
  const buttonText = pending ? "Adding…" : "Add";

  return (
    <button type="submit" disabled={pending}>
      {buttonText}
    </button>
  );
}
