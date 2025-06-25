import React from "react";
import { FiCheck } from "react-icons/fi";

export function TodoItem({ todo, updateTodo }) {
  return (
    <li className="flex items-center gap-3 border-b px-4 py-3">
      <button
        onClick={() => updateTodo(todo.id, todo.selesai)}
        className={
          `w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ` +
          (todo.selesai
            ? "border-green-500 text-green-500"
            : "border-gray-400 text-transparent")
        }
      >
        <FiCheck className="w-4 h-4" />
      </button>
      <span
        className={`text-xl font-semibold ${
          todo.selesai ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.judul}
      </span>
    </li>
  );
}
