import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonTable({
  rows,
  cells,
}: {
  rows: number;
  cells: number;
}) {
  const skeletons = new Array(rows).fill(null); 
  const tableCells = new Array(cells).fill(null);
  return (
    <>
      {skeletons.map((_, index) => (
        <TableRow key={index * Math.random()*100}>
          {tableCells.map((_, index) => (
            <TableCell key={index * Math.random()*100}>
              <Skeleton className="h-4 w-16" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
