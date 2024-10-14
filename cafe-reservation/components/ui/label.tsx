// Label.tsx
import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode; // Add this line to accept children
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
