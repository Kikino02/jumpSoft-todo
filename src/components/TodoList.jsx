export default function TodoList({
  todo,
  buttonText,
  buttonColor,
  handleDeleteTodo,
  handleStatus,
  handleTodoClick,
}) {
  // Days calculation
  const calculateDaysRemaining = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <li className="p-3 border rounded-lg bg-gray-50 shadow-md flex justify-between items-center gap-4">
      {/* Left section */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => handleTodoClick(todo)}
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
                {calculateDaysRemaining(todo.date) === 1 ? "day" : "days"})
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
          className={`text-sm font-bold ${buttonColor}`}
          onClick={() => handleStatus(todo)}
        >
          {buttonText}
        </button>
        <button
          className="text-sm font-bold text-red-600 hover:text-red-800"
          onClick={() => handleDeleteTodo(todo)}
        >
          X
        </button>
      </div>
    </li>
  );
}
