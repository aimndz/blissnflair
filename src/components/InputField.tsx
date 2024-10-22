import { InputFieldProps } from "../types/components";

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default InputField;
