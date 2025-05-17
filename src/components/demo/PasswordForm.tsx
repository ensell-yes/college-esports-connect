
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Password validation schema
const passwordSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordFormProps {
  onSuccess: () => void;
}

const PasswordForm = ({ onSuccess }: PasswordFormProps) => {
  // Use the auth context to get access to demo access functions
  const { setDemoAccess } = useAuth();
  
  // Password form
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Handle password submission
  const handlePasswordSubmit = (values: PasswordFormValues) => {
    if (values.password === "Path2College") {
      // Set demo access with JWT (expires in 2 hours)
      setDemoAccess(true);
      onSuccess();
      toast.success("Access granted!");
    } else {
      toast.error("Incorrect password. Please try again.");
      form.reset();
    }
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePasswordSubmit)} className="space-y-6">
              <FormField
                control={form.control}
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
};

export default PasswordForm;
