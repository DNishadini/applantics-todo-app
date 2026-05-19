import { useEffect, useState } from "react";

import { getTodos, createTodo, deleteTodo } from "../../services/todoService";

function Dashboard() {
  const [todos, setTodos] = useState([]);

  const [form, setForm] = useState({
    title: "",

    description: "",

    priority: "LOW",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();

      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTodo(form);

    setForm({
      title: "",

      description: "",

      priority: "LOW",
    });

    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);

    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8">TODO Dashboard</h1>

      {/* FORM */}

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
          required
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
          <option value="LOW">LOW</option>

          <option value="MEDIUM">MEDIUM</option>

          <option value="HIGH">HIGH</option>
        </select>

        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl">
          Add Todo
        </button>
      </form>

      {/* TODO LIST */}

      <div className="grid gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-6 rounded-2xl shadow flex justify-between items-start"
          >
            <div>
              <h2 className="text-xl font-bold">{todo.title}</h2>

              <p className="text-gray-600 mt-2">{todo.description}</p>

              <div className="mt-3">
                Priority:
                <span className="ml-2 font-semibold">{todo.priority}</span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
