/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

// components/operator/tabs/DelegatorsTab.tsx
interface DelegatorsTabProps {
  operatorId: string;
  delegators: any;
  isLoading: boolean;
}

export const DelegatorsTab = ({
  operatorId,
  delegators,
  isLoading,
}: DelegatorsTabProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  const delegatorsList = delegators?.data || [];
  const total = delegators?.total || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Delegators</p>
            <p className="text-2xl font-bold">{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Delegators</p>
            <p className="text-2xl font-bold text-green-500">
              {delegatorsList.filter((d: any) => d.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Delegation HHI</p>
            <p className="text-2xl font-bold">0.12</p>
            <p className="text-xs text-muted-foreground mt-1">
              Low concentration
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Delegator List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staker Address</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead>% of Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delegation Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {delegatorsList.map((delegator: any) => (
                <TableRow key={delegator.id}>
                  <TableCell className="font-mono text-xs">
                    {delegator.address.slice(0, 10)}...
                    {delegator.address.slice(-8)}
                  </TableCell>
                  <TableCell>{delegator.shares}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>2.5%</span>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "2.5%" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge>{delegator.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(delegator.delegationDate).toLocaleDateString()}
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
