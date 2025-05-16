
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StudentProfileFormValues } from "./schema";

interface GamerInfoFieldsProps {
  form: UseFormReturn<StudentProfileFormValues>;
}

const GamerInfoFields = ({ form }: GamerInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gamertag */}
      <FormField
        control={form.control}
        name="gamertag"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gamertag *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your gamertag" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Prefix/Sponsor */}
      <FormField
        control={form.control}
        name="prefix"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prefix/Sponsor</FormLabel>
            <FormControl>
              <Input placeholder="Team or sponsor prefix" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default GamerInfoFields;
