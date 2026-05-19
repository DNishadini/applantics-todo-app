import { useState } from "react";

import { CheckCircle2 } from "lucide-react";

import { loginUser } from "../../services/authService";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",

    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(form);

      localStorage.setItem(
        "user",

        JSON.stringify(response.data.user),
      );

      toast.success("Login successful");

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error.response);

      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full">
        {/* LEFT SIDE */}

        <div className="bg-slate-900 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Applantics TODO</h1>

          <p className="text-slate-300 mb-8">
            Professional task management system built with Laravel and React.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle2 />

              <span>Track daily tasks</span>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 />

              <span>Manage priorities</span>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 />

              <span>Elegant dashboard</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="p-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>

          <p className="text-gray-500 mb-8">Login to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-xl p-4"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-xl p-4"
            />

            <button className="w-full bg-slate-900 text-white p-4 rounded-xl">
              Login
            </button>
          </form>

          <p className="text-center mt-6">
            Don't have an account?
            <a href="/register" className="text-blue-600 ml-2 font-semibold">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
