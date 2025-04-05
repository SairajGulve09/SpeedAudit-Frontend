import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);
