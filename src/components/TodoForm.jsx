import React, { useState } from "react";
import InputField from "./InputField";

export default function TodoForm({ onAdd }) {
  const [todo, setTodo] = useState({
    name: "",
    description: "",
    date: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAdd(todo);
    setTodo({ name: "", description: "", date: "", priority: "" });
  };

  return (
    <div>
      <h2 className="text-center font-bold text-2xl mb-3 text-gray-800">
        Create New Todo
      </h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={todo.name}
          onChange={handleChange}
        />
        <InputField
          type="textarea"
          name="description"
          placeholder="Description"
          value={todo.description}
          onChange={handleChange}
        />
        <InputField
          type="date"
          name="date"
          value={todo.date}
          onChange={handleChange}
        />
        <InputField
          type="select"
          name="priority"
          placeholder="Priority"
          options={[
            { value: "L", label: "Low" },
            { value: "M", label: "Medium" },
            { value: "H", label: "High" },
          ]}
          value={todo.priority}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
}
