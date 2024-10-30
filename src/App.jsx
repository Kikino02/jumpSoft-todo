import React, { useState } from "react";
import Modal from "./components/Modal";
import data from "../public/data.json";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState(data);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Add Todo
  const handleAddTodo = (newTodo) => {
    const formattedDate = new Date(newTodo.date).toISOString().split("T")[0];

    setTodos((prevTodos) => [
      ...prevTodos,
      { ...newTodo, date: formattedDate, status: "To Do" },
    ]);
  };

  // Toggle Status
  const handleStatus = (selectedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === selectedTodo.id
          ? {
              ...todo,
              status:
                todo.status === "To Do"
                  ? "In Progress"
                  : todo.status === "In Progress"
                  ? "Done"
                  : "To Do",
            }
          : todo
      )
    );
  };

  // Delete To-Do
  const handleDeleteTodo = (todo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  };

  // Modal
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
  };

  const handleAddClick = () => {
    setSelectedTodo({
      id: "",
      name: "",
      description: "",
      date: "",
      priority: "",
    });
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  // Save the updated todo
  const handleSaveTodo = (updatedTodo) => {
    setTodos((prevTodos) => {
      const todoExists = prevTodos.some((todo) => todo.id === updatedTodo.id);

      if (todoExists) {
        return prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      } else {
        return [...prevTodos, updatedTodo];
      }
    });
  };

  const getFilteredTodos = (status) =>
    todos.filter((todo) => todo.status === status);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full m-10">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          To-Do List
        </h1>

        <div className="flex gap-8 lg:gap-2 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3">
            <h3 className="font-bold text-xl text-center mb-2">To Do</h3>
            <ul className="space-y-2">
              {getFilteredTodos("To Do").map((todo) => (
                <TodoList
                  key={todo.id}
                  todo={todo}
                  buttonText="Start"
                  buttonColor="text-blue-500"
                  handleDeleteTodo={handleDeleteTodo}
                  handleStatus={handleStatus}
                  handleTodoClick={handleTodoClick}
                />
              ))}
            </ul>
            {getFilteredTodos("To Do").length === 0 && (
              <p className="text-center mt-4 font-semibold text-red-500">
                Nothing to show
              </p>
            )}
            {getFilteredTodos("To Do").length > 0 && (
              <p className="text-center mt-4 font-semibold text-red-500">
                You have {getFilteredTodos("To Do").length} tasks To Do.
              </p>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="font-bold text-xl text-center mb-2">In Progress</h3>
            <ul className="space-y-2">
              {getFilteredTodos("In Progress").map((todo) => (
                <TodoList
                  key={todo.id}
                  todo={todo}
                  buttonText="Finish"
                  buttonColor="text-yellow-600"
                  handleDeleteTodo={handleDeleteTodo}
                  handleStatus={handleStatus}
                  handleTodoClick={handleTodoClick}
                />
              ))}
            </ul>
            {getFilteredTodos("In Progress").length === 0 && (
              <p className="text-center mt-4 font-semibold text-red-500">
                Nothing to show
              </p>
            )}
            {getFilteredTodos("In Progress").length > 0 && (
              <p className="text-center mt-4 font-semibold text-red-500">
                You have {getFilteredTodos("In Progress").length} unfinished
                tasks In Progress.
              </p>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="font-bold text-xl text-center mb-2">Done</h3>
            <ul className="space-y-2">
              {getFilteredTodos("Done").map((todo) => (
                <TodoList
                  key={todo.id}
                  todo={todo}
                  buttonText="Restart"
                  buttonColor="text-purple-600"
                  handleDeleteTodo={handleDeleteTodo}
                  handleStatus={handleStatus}
                  handleTodoClick={handleTodoClick}
                />
              ))}
            </ul>
            {getFilteredTodos("Done").length === 0 && (
              <p className="text-center mt-4 font-semibold text-red-500">
                Nothing to show
              </p>
            )}
            {getFilteredTodos("Done").length > 0 &&
              getFilteredTodos("Done").length !== todos.length && (
                <p className="text-center mt-4 font-semibold text-red-500">
                  You have done {getFilteredTodos("Done").length} tasks.
                </p>
              )}
            {getFilteredTodos("Done").length === todos.length && (
              <p className="text-center mt-4 font-semibold text-green-500">
                All {getFilteredTodos("Done").length} tasks are completed.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-4">
          <button
            onClick={handleAddClick}
            className={`px-4 py-2 w-1/2 ${
              todos.length === 0 ? "mt-0" : "mt-10"
            } bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600`}
          >
            Add
          </button>
        </div>

        {selectedTodo && (
          <Modal
            todo={selectedTodo}
            onClose={handleCloseModal}
            onSave={handleSaveTodo}
          />
        )}
      </div>
    </div>
  );
}
