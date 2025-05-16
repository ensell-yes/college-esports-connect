
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StudentProfileFormValues } from "./schema";
import { parse } from "date-fns";
import { useState } from "react";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<StudentProfileFormValues>;
}

const PersonalInfoFields = ({ form }: PersonalInfoFieldsProps) => {
  // Handle manual text input
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputValue = e.target.value;
      // Try to parse the date from the input
      const parsedDate = parse(inputValue, "MM/dd/yyyy", new Date());
      
      if (!isNaN(parsedDate.getTime())) {
        form.setValue("dateOfBirth", parsedDate);
      }
    } catch (error) {
      // Invalid format, we'll just let the validation handle it
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name *</FormLabel>
            <FormControl>
              <Input placeholder="Your first name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Last Name */}
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name *</FormLabel>
            <FormControl>
              <Input placeholder="Your last name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>School Email Address *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your.email@school.edu" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone */}
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile Number *</FormLabel>
            <FormControl>
              <Input placeholder="(123) 456-7890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Date of Birth - simplified to text input only */}
      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem className="flex flex-col col-span-full">
            <FormLabel>Date of Birth *</FormLabel>
            <FormControl>
              <Input 
                placeholder="MM/DD/YYYY" 
                value={field.value ? field.value.toLocaleDateString('en-US') : ""}
                onChange={handleDateInput}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoFields;
