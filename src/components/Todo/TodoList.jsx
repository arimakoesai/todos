"use client";

import React, { useEffect, useState } from "react";
import { TodoAdd } from "./TodoAdd";
import { TodoItem } from "./TodoItem";
import { TodoFilters } from "./TodoFilters";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data.todos);
  }

  async function addTodo(event) {
    event.preventDefault();
    if (!newTodo) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul: newTodo }),
    });
    setNewTodo("");
    getTodos();
  }

  async function updateTodo(id, selesai) {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selesai: !selesai }),
    });
    getTodos();
  }

  async function toggleAll() {
    const allDone = todos.every((todo) => todo.selesai);
    for (const todo of todos) {
      await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selesai: !allDone }),
      });
    }
    getTodos();
  }

  async function clearCompleted() {
    const completed = todos.filter((todo) => todo.selesai);
    for (const todo of completed) {
      await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selesai: false }),
      });
    }
    getTodos();
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.selesai;
    if (filter === "completed") return todo.selesai;
    return true;
  });

  return (
    <section className="max-w-xl mx-auto mt-5 relative">
      <div className="absolute -bottom-1 left-1 right-1 bg-gray-200 h-2 rounded z-[-1]" />
      <div className="absolute -bottom-2 left-2 right-2 bg-gray-300 h-2 rounded z-[-2]" />
      <div className="bg-white shadow-md rounded-md">
        <TodoAdd
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          toggleAll={toggleAll}
        />
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
          ))}
        </ul>
        <TodoFilters
          remaining={todos.filter((todo) => !todo.selesai).length}
          setFilter={setFilter}
          currentFilter={filter}
          clearCompleted={clearCompleted}
        />
      </div>
    </section>
  );
}
