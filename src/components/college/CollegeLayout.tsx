
import React from "react";

interface CollegeLayoutProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

const CollegeLayout: React.FC<CollegeLayoutProps> = ({ 
  children, 
  columns = 2,
  className = ""
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default CollegeLayout;
