
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, FieldPath } from "react-hook-form";
import { StudentProfileFormValues } from "../schema";

interface BasicInfoFieldProps {
  form: UseFormReturn<StudentProfileFormValues>;
  name: FieldPath<StudentProfileFormValues>;
  label: string;
  placeholder: string;
  type?: string;
}

export const BasicInfoField = ({ 
  form, 
  name, 
  label, 
  placeholder, 
  type = "text" 
}: BasicInfoFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} *</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
