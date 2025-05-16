
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordForm from "@/components/demo/PasswordForm";
import RoleSelectionForm from "@/components/demo/RoleSelectionForm";
import StudentProfileForm from "@/components/StudentProfileForm";

const Demo = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle role selection
  const handleRoleSelected = (role: string) => {
    setSelectedRole(role);
    
    // We'll only redirect non-student users to the home page
    // Students will proceed to the profile form
    if (role !== "student") {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  // Password screen
  if (!isAuthenticated) {
    return <PasswordForm onSuccess={handleAuthSuccess} />;
  }

  // Role selection screen
  if (isAuthenticated && !selectedRole) {
    return <RoleSelectionForm onRoleSelected={handleRoleSelected} />;
  }

  // If student role is selected, show the student profile form
  if (selectedRole === "student") {
    return <StudentProfileForm />;
  }

  // This should never happen, but just in case
  return <div>Loading...</div>;
};

export default Demo;
