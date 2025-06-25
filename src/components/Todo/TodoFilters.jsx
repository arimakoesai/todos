import React from "react";

export function TodoFilters({
  remaining,
  setFilter,
  clearCompleted,
  currentFilter,
}) {
  const filters = ["all", "active", "completed"];
  return (
    <div className="flex justify-between items-center text-sm text-gray-600 px-4 py-3">
      <span>{remaining} items left!</span>
      <div className="space-x-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-1 ${
              currentFilter === f
                ? "border border-red-400 text-gray-600"
                : "text-gray-600 hover:underline"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button onClick={clearCompleted} className="hover:underline">
        Clear completed
      </button>
    </div>
  );
}
