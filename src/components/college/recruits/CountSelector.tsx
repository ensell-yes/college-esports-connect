
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountOption } from "./types";

interface CountSelectorProps {
  selectedCount: CountOption;
  onCountChange: (count: CountOption) => void;
}

const CountSelector = ({ selectedCount, onCountChange }: CountSelectorProps) => {
  return (
    <Select 
      value={selectedCount.toString()} 
      onValueChange={(value) => onCountChange(parseInt(value) as CountOption)}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Count" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">Top 10</SelectItem>
        <SelectItem value="50">Top 50</SelectItem>
        <SelectItem value="100">Top 100</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CountSelector;
