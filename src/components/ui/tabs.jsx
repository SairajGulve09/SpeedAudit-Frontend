// components/ui/tabs.jsx
import * as React from "react";
import clsx from "clsx";

export const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={clsx("tabs w-full", className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
};

export const TabsList = ({ children, className, activeTab, setActiveTab }) => (
  <div className={clsx("flex border-b mb-4", className)}>
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child, { activeTab, setActiveTab });
    })}
  </div>
);

export const TabsTrigger = ({ children, value, className, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={clsx(
      "px-4 py-2 text-sm font-medium border-b-2",
      activeTab === value
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700",
      className
    )}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, activeTab, className }) => {
  if (value !== activeTab) return null;
  return <div className={clsx("mt-2", className)}>{children}</div>;
};