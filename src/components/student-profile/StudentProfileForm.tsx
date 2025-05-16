
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { studentProfileSchema, StudentProfileFormValues } from "./schema";
import GamerInfoFields from "./GamerInfoFields";
import PersonalInfoFields from "./PersonalInfoFields";
import AddressFields from "./AddressFields";

interface StudentProfileFormProps {
  onSubmit?: () => void;
}

const StudentProfileForm = ({ onSubmit }: StudentProfileFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define form
  const form = useForm<StudentProfileFormValues>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      gamertag: "",
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "us",
    },
  });

  // Handle form submission
  const handleSubmit = async (values: StudentProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would send this data to your backend
      console.log("Student profile data:", values);
      
      toast.success("Profile information saved!");
      
      // Call onSubmit callback if provided
      if (onSubmit) {
        setTimeout(() => {
          onSubmit();
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error saving your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Student Profile</CardTitle>
          <CardDescription className="text-center">
            Please provide your gaming and personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Gamer Info Section */}
              <GamerInfoFields form={form} />
              
              {/* Personal Info Section */}
              <PersonalInfoFields form={form} />
              
              {/* Address Section */}
              <AddressFields form={form} />

              <Button 
                type="submit" 
                className="w-full bg-esports-purple hover:bg-esports-purple/80"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfileForm;
