import React from "react";

function InputField({
  type = "text",
  placeholder,
  required = false,
  className = "",
  rightElement = null,
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full text-base border-b border-solid border-[none] border-b-gray-300 h-[52px] text-neutral-400"
        {...props}
      />
      {rightElement && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
}

export default InputField;
