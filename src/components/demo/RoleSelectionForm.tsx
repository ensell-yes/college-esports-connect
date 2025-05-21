
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// User role selection schema
const roleSchema = z.object({
  role: z.enum(["student", "parent", "coach", "administrator"]),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface RoleSelectionFormProps {
  onRoleSelected: (role: string) => void;
}

const RoleSelectionForm = ({ onRoleSelected }: RoleSelectionFormProps) => {
  const navigate = useNavigate();
  
  // Role selection form
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: undefined,
    },
  });

  // Handle role submission
  const handleRoleSubmit = (values: RoleFormValues) => {
    toast.success(`You selected: ${values.role}`);
    
    // If administrator role is selected, redirect to college profile
    if (values.role === "administrator") {
      navigate("/college-profile-graceland");
    } else {
      // For other roles, use the provided callback
      onRoleSelected(values.role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to EsportsRecruit</CardTitle>
          <CardDescription className="text-center">
            Please tell us a bit about yourself
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRoleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="parent">Parent/Guardian</SelectItem>
                        <SelectItem value="coach">Coach</SelectItem>
                        <SelectItem value="administrator">School Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-esports-purple hover:bg-esports-purple/80">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelectionForm;
