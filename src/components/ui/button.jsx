import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
