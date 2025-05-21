
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { SortColumn, SortDirection } from "./types";

interface SortableTableHeaderProps {
  column: SortColumn;
  currentSortColumn: SortColumn;
  currentSortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  children: React.ReactNode;
}

const SortableTableHeader = ({
  column,
  currentSortColumn,
  currentSortDirection,
  onSort,
  children
}: SortableTableHeaderProps) => {
  const getSortIcon = () => {
    if (currentSortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return currentSortDirection === "asc" 
      ? <ArrowUp className="ml-2 h-4 w-4" /> 
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <TableHead 
      className="cursor-pointer"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center">
        {children}
        {getSortIcon()}
      </div>
    </TableHead>
  );
};

export default SortableTableHeader;
