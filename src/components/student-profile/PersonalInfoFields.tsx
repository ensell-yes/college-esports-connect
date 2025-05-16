
import { UseFormReturn } from "react-hook-form";
import { StudentProfileFormValues } from "./schema";
import { BasicInfoField } from "./fields/BasicInfoField";
import { DateOfBirthField } from "./fields/DateOfBirthField";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<StudentProfileFormValues>;
}

const PersonalInfoFields = ({ form }: PersonalInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <BasicInfoField
        form={form}
        name="firstName"
        label="First Name"
        placeholder="Your first name"
      />

      {/* Last Name */}
      <BasicInfoField
        form={form}
        name="lastName"
        label="Last Name"
        placeholder="Your last name"
      />

      {/* Email */}
      <BasicInfoField
        form={form}
        name="email"
        label="School Email Address"
        placeholder="your.email@school.edu"
        type="email"
      />

      {/* Phone */}
      <BasicInfoField
        form={form}
        name="phone"
        label="Mobile Number"
        placeholder="(123) 456-7890"
      />

      {/* Date of Birth */}
      <DateOfBirthField form={form} />
    </div>
  );
};

export default PersonalInfoFields;
