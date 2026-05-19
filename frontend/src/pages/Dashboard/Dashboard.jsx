import { useEffect, useState } from "react";

import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../services/todoService";

function Dashboard() {
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",

    description: "",

    priority: "LOW",

    status: "PENDING",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await getTodos();

    setTodos(response.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateTodo(editingId, form);

      setEditingId(null);
    } else {
      await createTodo(form);
    }

    setForm({
      title: "",

      description: "",

      priority: "LOW",

      status: "PENDING",
    });

    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);

    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);

    setForm({
      title: todo.title,

      description: todo.description,

      priority: todo.priority,

      status: todo.status,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8">TODO Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded-xl"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >
          <option>PENDING</option>

          <option>IN_PROGRESS</option>

          <option>DONE</option>
        </select>

        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl">
          {editingId ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      <div className="grid gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-6 rounded-2xl shadow flex justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{todo.title}</h2>

              <p>{todo.description}</p>

              <div className="mt-2 flex gap-2">
                <span className="bg-blue-100 px-3 py-1 rounded-full">
                  {todo.priority}
                </span>

                <span className="bg-green-100 px-3 py-1 rounded-full">
                  {todo.status}
                </span>
              </div>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(todo)}
                className="bg-amber-500 text-white px-4 py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
