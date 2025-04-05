import React from "react";

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:ring focus:ring-blue-200 ${className}`}
    {...props}
  />
);
