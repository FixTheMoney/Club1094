"use client";

import { useEffect, useState } from "react";
import Card from "./Card";

const KEY = "dashboard-todos";

// To-dos are saved in this browser only (localStorage).
export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setTodos(saved);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(todos));
    } catch {}
  }, [todos, loaded]);

  function add(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setTodos([...todos, { id: Date.now(), text: t, done: false }]);
    setText("");
  }

  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));
  const left = todos.filter((t) => !t.done).length;

  return (
    <Card title="To-do" action={<span className="text-xs text-muted">{left} left</span>}>
      <form onSubmit={add} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
          className="flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-bg hover:opacity-90">Add</button>
      </form>
      <ul className="mt-3 max-h-56 space-y-1 overflow-y-auto">
        {todos.length === 0 && loaded && <li className="py-2 text-sm text-muted">Nothing yet — enjoy the calm.</li>}
        {todos.map((t) => (
          <li key={t.id} className="group flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-bg">
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} className="accent-[#7c9cff]" />
            <span className={`flex-1 text-sm ${t.done ? "text-muted line-through" : ""}`}>{t.text}</span>
            <button
              onClick={() => remove(t.id)}
              aria-label="Delete task"
              className="text-muted opacity-0 hover:text-bad group-hover:opacity-100"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
