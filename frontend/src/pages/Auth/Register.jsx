import { useState } from "react";

import { registerUser } from "../../services/authService";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",

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
      await registerUser(form);

      toast.success("Account created");

      navigate("/");
    } catch {
      toast.error("Register failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-96 space-y-4"
      >
        <h1 className="text-3xl font-bold">Register</h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <button className="w-full bg-slate-900 text-white p-3 rounded-xl">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
