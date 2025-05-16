
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StudentProfileFormValues } from "../schema";
import { parse } from "date-fns";

interface DateOfBirthFieldProps {
  form: UseFormReturn<StudentProfileFormValues>;
}

export const DateOfBirthField = ({ form }: DateOfBirthFieldProps) => {
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
  );
};
