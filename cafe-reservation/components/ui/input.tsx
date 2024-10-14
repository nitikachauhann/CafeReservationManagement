// Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean; // Add this line
}

const Input: React.FC<InputProps> = ({ required, ...props }) => {
  return <input required={required} {...props} />;
};

export default Input;
