
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordForm from "@/components/demo/PasswordForm";
import RoleSelectionForm from "@/components/demo/RoleSelectionForm";
import { StudentProfileForm, ConnectedAccountsForm } from "@/components";

const Demo = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [profileSubmitted, setProfileSubmitted] = useState(false);
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

  // Handle profile submission
  const handleProfileSubmitted = () => {
    setProfileSubmitted(true);
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
  if (selectedRole === "student" && !profileSubmitted) {
    return <StudentProfileForm onSubmit={handleProfileSubmitted} />;
  }

  // After profile submission, show the connected accounts form
  if (selectedRole === "student" && profileSubmitted) {
    return <ConnectedAccountsForm />;
  }

  // This should never happen, but just in case
  return <div>Loading...</div>;
};

export default Demo;
