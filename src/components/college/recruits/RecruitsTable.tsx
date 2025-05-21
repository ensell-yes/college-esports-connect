
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortState, SortColumn } from "./types";
import SortableTableHeader from "./SortableTableHeader";
import { Recruit } from "../types/recruitTypes";

interface RecruitsTableProps {
  recruits: Recruit[];
  sort: SortState;
  toggleSort: (column: SortColumn) => void;
}

const RecruitsTable = ({ recruits, sort, toggleSort }: RecruitsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableTableHeader
              column="rank"
              currentSortColumn={sort.column}
              currentSortDirection={sort.direction}
              onSort={toggleSort}
            >
              Rank
            </SortableTableHeader>
            <SortableTableHeader
              column="name"
              currentSortColumn={sort.column}
              currentSortDirection={sort.direction}
              onSort={toggleSort}
            >
              Name
            </SortableTableHeader>
            <SortableTableHeader
              column="location"
              currentSortColumn={sort.column}
              currentSortDirection={sort.direction}
              onSort={toggleSort}
            >
              Location
            </SortableTableHeader>
            <SortableTableHeader
              column="classification"
              currentSortColumn={sort.column}
              currentSortDirection={sort.direction}
              onSort={toggleSort}
            >
              Classification
            </SortableTableHeader>
            <SortableTableHeader
              column="agent"
              currentSortColumn={sort.column}
              currentSortDirection={sort.direction}
              onSort={toggleSort}
            >
              Agent
            </SortableTableHeader>
            <SortableTableHeader
              column="status"
              currentSortColumn={sort.column}
              currentSortDirection={sort.direction}
              onSort={toggleSort}
            >
              Status
            </SortableTableHeader>
            <SortableTableHeader
              column="university"
              currentSortColumn={sort.column}
              currentSortDirection={sort.direction}
              onSort={toggleSort}
            >
              University
            </SortableTableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recruits.map((recruit) => (
            <TableRow key={recruit.id}>
              <TableCell className="font-medium">{recruit.currentRank}</TableCell>
              <TableCell>{recruit.firstName} {recruit.lastName}</TableCell>
              <TableCell>
                {recruit.city}, {recruit.state ? `${recruit.state}, ` : ''}{recruit.country}
              </TableCell>
              <TableCell>{recruit.classification}</TableCell>
              <TableCell>
                {recruit.game === "Valorant" ? recruit.mainAgent : "-"}
              </TableCell>
              <TableCell>{recruit.recruitmentStatus}</TableCell>
              <TableCell>{recruit.university || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecruitsTable;
