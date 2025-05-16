
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  CardFooter,
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

// Password validation schema
const passwordSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

// User role selection schema
const roleSchema = z.object({
  role: z.enum(["student", "parent", "coach", "administrator"]),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;
type RoleFormValues = z.infer<typeof roleSchema>;

const Demo = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Role selection form
  const roleForm = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: undefined,
    },
  });

  // Handle password submission
  const handlePasswordSubmit = (values: PasswordFormValues) => {
    if (values.password === "Path2College") {
      setIsAuthenticated(true);
      toast.success("Access granted!");
    } else {
      toast.error("Incorrect password. Please try again.");
      passwordForm.reset();
    }
  };

  // Handle role selection
  const handleRoleSubmit = (values: RoleFormValues) => {
    setSelectedRole(values.role);
    toast.success(`You selected: ${values.role}`);
    // In a real app, you would store this in a user profile
    // For now we'll just redirect to the index page
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // Password screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Demo Access</CardTitle>
            <CardDescription className="text-center">
              Please enter the password to access the demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter access password"
                            className="pl-10"
                          />
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-esports-purple hover:bg-esports-purple/80">
                  Access Demo
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Role selection screen
  if (isAuthenticated && !selectedRole) {
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
            <Form {...roleForm}>
              <form onSubmit={roleForm.handleSubmit(handleRoleSubmit)} className="space-y-6">
                <FormField
                  control={roleForm.control}
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
  }

  // This should never happen, but just in case
  return <div>Loading...</div>;
};

export default Demo;
