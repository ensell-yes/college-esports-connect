
import React from "react";

interface CollegeLayoutProps {
  children: React.ReactNode;
}

const CollegeLayout: React.FC<CollegeLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  );
};

export default CollegeLayout;
