
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {children}
    </div>
  );
};

export default DashboardLayout;
