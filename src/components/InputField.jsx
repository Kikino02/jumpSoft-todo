export default function InputField({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  options,
  isRequired,
}) {
  const today = new Date().toISOString().split("T")[0];

  if (type === "select") {
    return (
      <select
        name={name}
        value={value}
        className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200"
        onChange={onChange}
        required={isRequired}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options &&
          options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    );
  }

  if (type === "textarea") {
    return (
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200"
        required={isRequired}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200"
      required={isRequired}
      autoComplete="off"
      {...(type === "date" && { min: today })}
    />
  );
}
