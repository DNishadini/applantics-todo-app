import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getTodos = () => API.get("/todos");

export const createTodo = (data) => API.post("/todos", data);

export const deleteTodo = (id) => API.delete(`/todos/${id}`);

export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
