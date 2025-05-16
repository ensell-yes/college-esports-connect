
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
import { parse } from "date-fns";

interface StudentProfileFormProps {
  onSubmit?: () => void;
}

const StudentProfileForm = ({ onSubmit }: StudentProfileFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Define default values for autofill
  const defaultValues: StudentProfileFormValues = {
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
    dateOfBirth: new Date(),
  };

  // Define form
  const form = useForm<StudentProfileFormValues>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues,
  });

  // Function to check if form is empty
  const isFormEmpty = (values: StudentProfileFormValues): boolean => {
    return (
      !values.gamertag &&
      !values.firstName &&
      !values.lastName &&
      !values.email &&
      !values.phone &&
      !values.addressLine1 &&
      !values.city &&
      !values.state
    );
  };

  // Function to autofill form with default data
  const autofillForm = () => {
    const defaultData: StudentProfileFormValues = {
      gamertag: "DadJoke",
      prefix: "[Yes]",
      firstName: "Ensell",
      lastName: "Lee",
      email: "ensell.lee@hardknocks.edu",
      phone: "415-828-8228",
      addressLine1: "274 Redwood Shores Pkwy",
      addressLine2: "Suite 618",
      city: "Redwood City",
      state: "CA",
      zipCode: "94065",
      country: "us",
      dateOfBirth: parse("01/01/2000", "MM/dd/yyyy", new Date()),
    };

    // Update form values
    Object.entries(defaultData).forEach(([key, value]) => {
      form.setValue(key as keyof StudentProfileFormValues, value);
    });

    return defaultData;
  };

  // Handle form submission
  const handleSubmit = async (values: StudentProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // If form is empty, autofill with default data
      const finalValues = isFormEmpty(values) ? autofillForm() : values;
      
      // In a real app, you would send this data to your backend
      console.log("Student profile data:", finalValues);
      
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

  // Handle going back
  const handleGoBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleGoBack} 
              className="mr-2"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-center">Student Profile</CardTitle>
              <CardDescription className="text-center">
                Please provide your gaming and personal information
              </CardDescription>
            </div>
          </div>
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
