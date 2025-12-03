/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table, Badge } from "lucide-react";

// components/operator/tabs/AllocationsTab.tsx
interface AllocationsTabProps {
  operatorId: string;
  allocations: any;
  isLoading: boolean;
}

export const AllocationsTab = ({
  operatorId,
  allocations,
  isLoading,
}: AllocationsTabProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Allocated</p>
            <p className="text-2xl font-bold">
              {allocations?.totalAllocated || 0} ETH
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Utilization Rate</p>
            <p className="text-2xl font-bold">
              {allocations?.utilizationRate || 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Allocations by AVS</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>AVS</TableHead>
                <TableHead>Total Magnitude</TableHead>
                <TableHead>Strategies</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations?.byAVS?.map((alloc: any) => (
                <TableRow key={alloc.avsId}>
                  <TableCell>{alloc.avsName}</TableCell>
                  <TableCell>{alloc.totalMagnitude} ETH</TableCell>
                  <TableCell>
                    <Badge>{alloc.strategies}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
