import React, { useState } from "react";
import InputField from "./InputField";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function Modal({ todo, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(todo.id === "");
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
  };

  const handleSave = () => {
    const newErrors = {};
    if (!editedTodo.name) newErrors.name = "Name is required.";
    if (!editedTodo.date) newErrors.date = "Date is required.";
    if (!editedTodo.description)
      newErrors.description = "Description is required.";
    if (!editedTodo.priority) newErrors.priority = "Priority is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editedTodo.id === "") {
      editedTodo.id = generateUUID();
      editedTodo.status = "To Do";
    }

    onSave(editedTodo);
    setIsEditing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4 flex flex-col justify-between h-[400px]">
        {/* Main Content */}
        <div className="flex-grow overflow-auto mb-4">
          {isEditing || isCreating ? (
            <div className="flex flex-col gap-4">
              <div>
                <InputField
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editedTodo.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <InputField
                  type="date"
                  name="date"
                  value={editedTodo.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date}</p>
                )}
              </div>

              <div>
                <InputField
                  type="textarea"
                  name="description"
                  placeholder="Description"
                  value={editedTodo.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div>
                <InputField
                  type="select"
                  name="priority"
                  placeholder="Priority"
                  value={editedTodo.priority}
                  onChange={handleChange}
                  options={[
                    { value: "H", label: "High" },
                    { value: "M", label: "Medium" },
                    { value: "L", label: "Low" },
                  ]}
                />
                {errors.priority && (
                  <p className="text-red-500 text-sm">{errors.priority}</p>
                )}
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">{todo.name}</h2>
              <p className="text-gray-500 mb-4">
                <span className="font-bold">Date:</span>{" "}
                {new Date(todo.date).toLocaleDateString("sk-SK")}
              </p>
              <p className="text-gray-500 mb-4 whitespace-normal break-words">
                <span className="font-bold">Description:</span>{" "}
                {todo.description}
              </p>
              <p
                className={`text-sm font-semibold mb-4 px-2 py-1 rounded-md inline-block ${
                  todo.priority === "H"
                    ? "bg-red-100 text-red-700"
                    : todo.priority === "M"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {todo.priority === "H"
                  ? "High"
                  : todo.priority === "M"
                  ? "Medium"
                  : "Low"}
              </p>
            </>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (isCreating || isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
          >
            {isCreating && !isEditing && "Add"}
            {!isCreating && !isEditing && "Edit"}
            {!isCreating && isEditing && "Save"}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
