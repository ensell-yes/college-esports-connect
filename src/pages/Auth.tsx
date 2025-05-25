import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Password validation schema
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });

// Form schema for registration
const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Form schema for login
const loginSchema = z.object({
  loginEmail: z.string().email({ message: "Please enter a valid email address" }),
  loginPassword: z.string().min(1, { message: "Password is required" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    // resolver: zodResolver(registerSchema),
    resolver: async (data, context, options) => {
      console.log("formdata", data)
      console.log("validation result", await zodResolver(registerSchema)(data, context, options))
      return zodResolver(registerSchema)(data, context, options)
    },
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginEmail: "",
      loginPassword: "",
    },
    mode: "onSubmit",
  });

  // Toggle between login and registration forms
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setAuthError(null);
    setIsLoading(false); // <-- Fix: ensure fields are enabled
    // registerForm.reset({
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // });
    // loginForm.reset({
    //   email: "",
    //   password: "",
    // });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Handle login with Supabase
  const handleLogin = async (values: LoginFormValues) => {
    console.log("Handling login form")
    
    try {
      setIsLoading(true);
      setAuthError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email: values.loginEmail,
        password: values.loginPassword,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      toast.success("Successfully signed in!");
      navigate("/");
    } catch (error: any) {
      setAuthError(error.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration with Supabase
  const handleRegister = async (values: RegisterFormValues) => {
    console.log("Handling register form")
    try {
      setIsLoading(true);
      setAuthError(null);

      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      toast.success("Registration successful! Please check your email to confirm your account.");
    } catch (error: any) {
      setAuthError(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social authentication
  const handleSocialAuth = async (provider: "google" | "discord") => {
    try {
      setIsLoading(true);
      setAuthError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setAuthError(error.message);
      }
    } catch (error: any) {
      setAuthError(error.message || `An error occurred during ${provider} sign in`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-esports-dark">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleForm}
              className="font-medium text-esports-purple hover:text-esports-purple/80"
            >
              {isLogin ? "Register" : "Sign in"}
            </button>
          </p>
        </div>

        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        {isLogin ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
              <FormField
                control={loginForm.control}
                name="loginEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          disabled={isLoading}
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="loginPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          disabled={isLoading}
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-esports-purple hover:bg-esports-purple/80"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          disabled={isLoading}
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          disabled={isLoading}
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          disabled={isLoading}
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-esports-purple hover:bg-esports-purple/80"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialAuth("google")}
              disabled={isLoading}
              className="w-full"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialAuth("discord")}
              disabled={isLoading}
              className="w-full"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M19.952,5.672c-1.904-1.531-4.916-1.79-5.044-1.801c-0.201-0.017-0.392,0.097-0.474,0.281 c-0.006,0.012-0.072,0.163-0.145,0.398c1.259,0.212,2.806,0.64,4.206,1.509c0.224,0.139,0.293,0.434,0.154,0.659 c-0.09,0.146-0.247,0.226-0.407,0.226c-0.086,0-0.173-0.023-0.252-0.072C15.584,5.38,12.578,5.305,12,5.305S8.415,5.38,6.011,6.872 c-0.225,0.14-0.519,0.07-0.659-0.154c-0.14-0.225-0.07-0.519,0.154-0.659c1.4-0.868,2.947-1.297,4.206-1.509 c-0.074-0.236-0.14-0.386-0.145-0.398C9.484,3.968,9.294,3.852,9.092,3.872c-0.127,0.01-3.139,0.269-5.069,1.822 C3.015,6.625,1,12.073,1,16.783c0,0.083,0.022,0.165,0.063,0.237c1.391,2.443,5.185,3.083,6.05,3.111c0.005,0,0.01,0,0.015,0 c0.153,0,0.297-0.073,0.387-0.197l0.875-1.202c-2.359-0.61-3.564-1.645-3.634-1.706c-0.198-0.175-0.217-0.477-0.042-0.675 c0.175-0.198,0.476-0.217,0.674-0.043c0.029,0.026,2.248,1.909,6.612,1.909c4.372,0,6.591-1.891,6.613-1.91 c0.198-0.172,0.5-0.154,0.674,0.045c0.174,0.198,0.155,0.499-0.042,0.673c-0.07,0.062-1.275,1.096-3.634,1.706l0.875,1.202 c0.09,0.124,0.234,0.197,0.387,0.197c0.005,0,0.01,0,0.015,0c0.865-0.027,4.659-0.667,6.05-3.111 C22.978,16.947,23,16.866,23,16.783C23,12.073,20.985,6.625,19.952,5.672z M8.891,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913s1.674,0.857,1.674,1.913S9.816,14.87,8.891,14.87z M15.109,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913c0.924,0,1.674,0.857,1.674,1.913S16.033,14.87,15.109,14.87z" />
              </svg>
              Discord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
