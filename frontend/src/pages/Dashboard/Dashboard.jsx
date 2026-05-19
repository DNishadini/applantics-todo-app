import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../services/todoService";

function Dashboard() {
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [dark, setDark] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "LOW",
    status: "PENDING",
    due_date: "",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const totalTodos = todos.length;

  const pendingTodos = todos.filter((todo) => todo.status === "PENDING").length;

  const progressTodos = todos.filter(
    (todo) => todo.status === "IN_PROGRESS",
  ).length;

  const doneTodos = todos.filter((todo) => todo.status === "DONE").length;

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()),
  );

  const fetchTodos = async () => {
    try {
      const response = await getTodos();

      setTodos(response.data);
    } catch (error) {
      toast.error("Failed to load todos");
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

    try {
      if (editingId) {
        await updateTodo(editingId, form);

        toast.success("Todo updated");

        setEditingId(null);
      } else {
        await createTodo(form);

        toast.success("Todo added");
      }

      setForm({
        title: "",
        description: "",
        priority: "LOW",
        status: "PENDING",
        due_date: "",
      });

      fetchTodos();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);

      toast.success("Todo deleted");

      fetchTodos();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);

    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      status: todo.status,
      due_date: todo.due_date || "",
    });
  };

  return (
    <DashboardLayout dark={dark} setDark={setDark}>
      <div className={dark ? "p-8 text-white" : "p-8"}>
        <h1 className="text-4xl font-bold mb-8">TODO Dashboard</h1>

        {/* SEARCH */}

        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-2xl border mb-8 text-black bg-white"
        />

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white text-black p-6 rounded-2xl shadow">
            <p>Total</p>

            <h2 className="text-3xl font-bold">{totalTodos}</h2>
          </div>

          <div className="bg-amber-100 p-6 rounded-2xl">
            Pending
            <h2 className="text-3xl font-bold">{pendingTodos}</h2>
          </div>

          <div className="bg-blue-100 p-6 rounded-2xl">
            Progress
            <h2 className="text-3xl font-bold">{progressTodos}</h2>
          </div>

          <div className="bg-green-100 p-6 rounded-2xl">
            Done
            <h2 className="text-3xl font-bold">{doneTodos}</h2>
          </div>
        </div>

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
            className="w-full border p-3 rounded-xl text-black"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-3 rounded-xl text-black"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl text-black"
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl text-black"
          >
            <option>PENDING</option>
            <option>IN_PROGRESS</option>
            <option>DONE</option>
          </select>

          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl text-black"
          />

          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl">
            {editingId ? "Update Todo" : "Add Todo"}
          </button>
        </form>

        {/* TODO LIST */}

        <div className="grid gap-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`

              p-6 rounded-2xl shadow flex justify-between

              ${
                todo.due_date &&
                new Date(todo.due_date) < new Date() &&
                todo.status !== "DONE"
                  ? "bg-red-100 border border-red-400"
                  : "bg-white"
              }

              `}
            >
              <div>
                <h2 className="text-black font-bold text-xl">{todo.title}</h2>

                <p className="text-gray-600 mt-2">{todo.description}</p>

                <p className="text-sm text-gray-500 mt-2">
                  📅 Due:
                  {todo.due_date ? todo.due_date : " No date"}
                </p>

                {todo.due_date &&
                  new Date(todo.due_date) < new Date() &&
                  todo.status !== "DONE" && (
                    <p className="text-red-600 font-bold mt-2">
                      ⚠ Overdue Task
                    </p>
                  )}
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
    </DashboardLayout>
  );
}

export default Dashboard;
