
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { PolicyEditor } from "@/components/policy-editor/PolicyEditor";
import { Navigate } from "react-router-dom";

const PolicyManagement = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Policy Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage Row-Level Security policies for your esports recruiting platform
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <PolicyEditor />
      </div>
    </div>
  );
};

export default PolicyManagement;
