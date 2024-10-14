// Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"; // Ensure this line exists
}

const Button: React.FC<ButtonProps> = ({ type, children, ...props }) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
