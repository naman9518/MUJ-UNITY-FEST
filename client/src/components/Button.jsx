import React from "react";

function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
  ...props
}) {
  const baseClasses = "cursor-pointer border-[none] font-semibold";

  const variantClasses = {
    primary: "bg-orange-500 text-neutral-100",
    secondary: "bg-white text-black border border-orange-500 border-solid",
    small:
      "p-2.5 text-xs font-semibold bg-orange-500 rounded-md text-neutral-100",
    large:
      "px-7 py-3.5 w-full text-xl font-semibold text-white bg-orange-500 rounded-md",
  };

  const sizeClasses = {
    primary: "h-[45px] w-[116px] text-base rounded-md max-sm:w-[100px]",
    secondary: "h-[45px] w-[117px] text-base rounded-md max-sm:w-[100px]",
    small: "",
    large: "",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
