import React from "react";

function SelectField({
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value=""
        disabled={disabled}
        required={required}
        className="w-full text-base border-b border-solid border-[none] border-b-gray-300 h-[52px] text-neutral-400"
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
      </select>
    </div>
  );
}

export default SelectField;
