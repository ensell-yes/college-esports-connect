
import React from "react";

interface CollegeLayoutProps {
  children: React.ReactNode;
  columns?: number;
}

const CollegeLayout: React.FC<CollegeLayoutProps> = ({ children, columns = 2 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {children}
    </div>
  );
};

export default CollegeLayout;
