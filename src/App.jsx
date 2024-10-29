import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import Modal from "./components/Modal";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const handleAddTodo = (newTodo) => {
    const formattedDate = new Date(newTodo.date).toISOString().split("T")[0];

    setTodos((prevTodos) => [
      ...prevTodos,
      { ...newTodo, date: formattedDate, status: "To Do" },
    ]);
    setShowForm(false);
  };

  const handleShowFormClick = () => {
    setShowForm(true);
  };

  // Toggle Status
  const handleButtonStatus = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index
          ? {
              ...todo,
              status:
                todo.status === "To Do"
                  ? "In Progress"
                  : todo.status === "In Progress"
                  ? "Done"
                  : todo.status === "Done"
                  ? "Again"
                  : "To Do",
            }
          : todo
      )
    );
  };

  // Delete To-Do
  const handleDeleteTodo = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  // Modal
  const handleTodoClick = (todo, index) => {
    setSelectedTodo({ ...todo, index });
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  // Save the updated todo
  const handleSaveTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) => (i === updatedTodo.index ? updatedTodo : todo))
    );
  };

  // Days calculation
  const calculateDaysRemaining = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {showForm ? (
          <TodoForm onAdd={handleAddTodo} />
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              To-Do List
            </h1>
            {todos.length === 0 && (
              <p className="text-center mb-4 font-semibold text-red-500">
                You did everything! Excellent.
              </p>
            )}
            <ul className="space-y-2">
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="p-3 border rounded-lg bg-gray-50 shadow-md flex justify-between items-center gap-4"
                >
                  {/* Left section */}
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleTodoClick(todo, index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <span className="text-sm sm:text-lg font-semibold text-gray-800">
                          {todo.name}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(todo.date).toLocaleDateString("sk-SK")}
                          <span
                            className={`ml-1 ${
                              calculateDaysRemaining(todo.date) <= 1
                                ? "text-red-500"
                                : calculateDaysRemaining(todo.date) <= 5
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          >
                            ({calculateDaysRemaining(todo.date)}{" "}
                            {calculateDaysRemaining(todo.date) === 1
                              ? "day"
                              : "days"}
                            )
                          </span>
                        </span>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-md ${
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
                      </span>
                    </div>
                  </div>

                  {/* Right section */}
                  <div className="flex gap-3 items-center">
                    <button
                      className={`text-sm font-bold ${
                        todo.status === "To Do"
                          ? "text-blue-500"
                          : todo.status === "In Progress"
                          ? "text-yellow-600"
                          : todo.status === "Done"
                          ? "text-green-500"
                          : "text-purple-600"
                      }`}
                      onClick={() => handleButtonStatus(index)}
                    >
                      {todo.status}
                    </button>
                    <button
                      className="text-sm font-bold text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                onClick={handleShowFormClick}
                className={`px-4 py-2 w-1/2 ${
                  todos.length === 0 ? "mt-0" : "mt-10"
                } bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600`}
              >
                Add
              </button>
            </div>
          </div>
        )}
        {selectedTodo && (
          <Modal
            todo={selectedTodo}
            onClose={handleCloseModal}
            onSave={handleSaveTodo}
            calculateDays={calculateDaysRemaining}
          />
        )}
      </div>
    </div>
  );
}
