
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import PasswordForm from "@/components/demo/PasswordForm";
import RoleSelectionForm from "@/components/demo/RoleSelectionForm";
import StudentProfileForm from "@/components/student-profile/StudentProfileForm";
import ConnectedAccountsForm from "@/components/connected-accounts/ConnectedAccountsForm";

type Role = "student" | "coach" | "parent" | "administrator" | null;
type Step = "password" | "role" | "profile" | "connected-accounts";

const Demo = () => {
  const { hasDemoAccess } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(null);
  const [currentStep, setCurrentStep] = useState<Step>("password");
  
  // Check for existing demo access on component mount
  useEffect(() => {
    // Skip password step if user has valid demo access
    if (hasDemoAccess() && currentStep === "password") {
      setCurrentStep("role");
    }
  }, []);

  const handlePasswordSuccess = () => {
    setCurrentStep("role");
  };

  const handleRoleSelection = (selectedRole: Role) => {
    setRole(selectedRole);
    setCurrentStep("profile");
  };

  const handleProfileCompletion = () => {
    setCurrentStep("connected-accounts");
  };

  const handleProfileBack = () => {
    setCurrentStep("role");
  };

  const handleConnectedAccountsBack = () => {
    setCurrentStep("profile");
  };

  const handleConnectedAccountsCompletion = () => {
    // Navigate to the appropriate dashboard based on role
    if (role === "student") {
      navigate("/player-dashboard");
    } else if (role === "coach" || role === "administrator") {
      navigate("/program-dashboard");
    } else {
      navigate("/"); // Default fallback if role is unexpected
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep === "password" && (
        <PasswordForm onSuccess={handlePasswordSuccess} />
      )}
      
      {currentStep === "role" && (
        <RoleSelectionForm onRoleSelected={handleRoleSelection} />
      )}
      
      {currentStep === "profile" && role && (
        <StudentProfileForm 
          onSubmit={handleProfileCompletion} 
          onBack={handleProfileBack}
        />
      )}
      
      {currentStep === "connected-accounts" && (
        <ConnectedAccountsForm 
          onBack={handleConnectedAccountsBack}
          onComplete={handleConnectedAccountsCompletion}
        />
      )}
    </div>
  );
};

export default Demo;
