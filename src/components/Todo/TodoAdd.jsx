import React from "react";
import { FiChevronDown } from "react-icons/fi";

export function TodoAdd({ newTodo, setNewTodo, addTodo }) {
  return (
    <form
      onSubmit={addTodo}
      className="border-t border-b border-gray-200 flex items-center px-4"
    >
      <FiChevronDown className="text-gray-400 w-6 h-6" />
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Ketik disini & enter untuk menambahkan"
        className="w-full p-4 text-xl outline-none"
      />
    </form>
  );
}
