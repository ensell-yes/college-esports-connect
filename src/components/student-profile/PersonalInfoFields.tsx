
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StudentProfileFormValues } from "./schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<StudentProfileFormValues>;
}

const PersonalInfoFields = ({ form }: PersonalInfoFieldsProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i - 10);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // Get selected date or current value
  const selectedDate = form.watch("dateOfBirth");
  
  // State for year, month, day
  const [selectedYear, setSelectedYear] = useState<number | null>(
    selectedDate ? selectedDate.getFullYear() : null
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    selectedDate ? selectedDate.getMonth() + 1 : null
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(
    selectedDate ? selectedDate.getDate() : null
  );
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  
  // Get days array based on selected year and month
  const getDaysArray = () => {
    if (!selectedYear || !selectedMonth) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };
  
  // Update date when year, month, or day changes
  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const maxDaysInMonth = getDaysInMonth(selectedYear, selectedMonth);
      const adjustedDay = selectedDay > maxDaysInMonth ? maxDaysInMonth : selectedDay;
      
      const newDate = new Date(selectedYear, selectedMonth - 1, adjustedDay);
      form.setValue("dateOfBirth", newDate);
    }
  }, [selectedYear, selectedMonth, selectedDay]);
  
  // Handle manual text input
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputValue = e.target.value;
      // Try to parse the date from the input
      const parsedDate = parse(inputValue, "MM/dd/yyyy", new Date());
      
      if (!isNaN(parsedDate.getTime())) {
        form.setValue("dateOfBirth", parsedDate);
        
        // Update dropdown selectors
        setSelectedYear(parsedDate.getFullYear());
        setSelectedMonth(parsedDate.getMonth() + 1);
        setSelectedDay(parsedDate.getDate());
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

      {/* Date of Birth */}
      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem className="flex flex-col col-span-full">
            <FormLabel>Date of Birth *</FormLabel>
            <div className="flex flex-col gap-2">
              {/* Text input for direct date entry */}
              <FormControl>
                <Input 
                  placeholder="MM/DD/YYYY" 
                  value={field.value ? format(field.value, "MM/dd/yyyy") : ""}
                  onChange={handleDateInput}
                />
              </FormControl>
              
              <div className="text-sm text-muted-foreground">Or select date:</div>
              
              {/* Dropdowns for year, month, day selection */}
              <div className="flex gap-2">
                {/* Year selector */}
                <div className="w-full">
                  <Select
                    value={selectedYear?.toString() || ""}
                    onValueChange={(value) => setSelectedYear(parseInt(value, 10))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="max-h-[300px] bg-popover">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Month selector */}
                <div className="w-full">
                  <Select
                    value={selectedMonth?.toString() || ""}
                    onValueChange={(value) => setSelectedMonth(parseInt(value, 10))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-popover">
                      {months.map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {format(new Date(2000, month - 1, 1), "MMMM")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Day selector */}
                <div className="w-full">
                  <Select
                    value={selectedDay?.toString() || ""}
                    onValueChange={(value) => setSelectedDay(parseInt(value, 10))}
                    disabled={!selectedYear || !selectedMonth}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="max-h-[300px] bg-popover">
                      {getDaysArray().map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Optional calendar picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full flex justify-between pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick from calendar</span>
                    )}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date);
                        setSelectedYear(date.getFullYear());
                        setSelectedMonth(date.getMonth() + 1);
                        setSelectedDay(date.getDate());
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoFields;
