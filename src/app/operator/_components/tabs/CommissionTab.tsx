/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// components/operator/tabs/CommissionTab.tsx
interface CommissionTabProps {
  operatorId: string;
  commission: any;
  isLoading: boolean;
}

export const CommissionTab = ({
  operatorId,
  commission,
  isLoading,
}: CommissionTabProps) => {
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
      <Card>
        <CardHeader>
          <CardTitle>Protocol-wide Commission (PI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{commission?.pi || 0}%</div>
          <p className="text-sm text-muted-foreground mt-2">
            Standard commission applied across all AVS
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Per-AVS Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>AVS</TableHead>
                <TableHead>Commission Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commission?.avs?.map((item: any) => (
                <TableRow key={item.avsId}>
                  <TableCell>{item.avsName}</TableCell>
                  <TableCell>{item.commission}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
