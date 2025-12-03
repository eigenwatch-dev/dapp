/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/operator/tabs/StrategiesTab.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpDown, Info, TrendingUp, PieChart } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { formatEther } from "@/lib/formatting";

interface StrategiesTabProps {
  operatorId: string;
  strategies: any[];
  isLoading: boolean;
}

const StrategiesTab = ({
  operatorId,
  strategies = [],
  isLoading,
}: StrategiesTabProps) => {
  const [sortField, setSortField] = useState<string>("tvs");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedStrategies = [...strategies].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const multiplier = sortOrder === "asc" ? 1 : -1;
    return (aVal > bVal ? 1 : -1) * multiplier;
  });

  // Prepare data for pie chart
  const pieChartData = strategies.map((strategy, index) => ({
    name: strategy.name || strategy.symbol || "Unknown",
    value: parseFloat(strategy.tvs) / 1e18,
    color: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!strategies || strategies.length === 0) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12 text-center">
          <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Strategies Found</h3>
          <p className="text-sm text-muted-foreground">
            This operator doesn&apos;t have any strategies configured yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalTVS = strategies.reduce((sum, s) => sum + parseFloat(s.tvs), 0);
  const totalEncumbered = strategies.reduce(
    (sum, s) => sum + parseFloat(s.encumbered || 0),
    0
  );
  const avgUtilization =
    strategies.reduce((sum, s) => sum + (s.utilizationRate || 0), 0) /
    strategies.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-0 flex">
            <div className="space-y-2 my-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9F9FA9]">Total Strategies</span>
                <Badge variant="secondary">{strategies.length}</Badge>
              </div>
              <p className="text-2xl font-bold">{strategies.length}</p>
              <p className="text-xs text-muted-foreground">
                Unique asset strategies
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Combined TVS
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        Total value across all strategies
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-2xl font-bold">
                {formatEther(totalTVS.toString())}
              </p>
              <p className="text-xs text-muted-foreground">
                Total delegated value
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Avg Utilization
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        Average utilization across all strategies
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</p>
              <Progress value={avgUtilization} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TVS Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>TVS Distribution by Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    `${entry.name}: ${entry.value.toFixed(2)} ETH`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: any) => `${value.toFixed(2)} ETH`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>

            <div className="flex flex-col justify-center space-y-3">
              <h4 className="font-semibold mb-2">Strategy Breakdown</h4>
              {pieChartData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {item.value.toFixed(2)} ETH
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategies Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("name")}
                      className="hover:bg-transparent"
                    >
                      Strategy
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("tvs")}
                      className="hover:bg-transparent"
                    >
                      Total Value
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("encumbered")}
                      className="hover:bg-transparent"
                    >
                      Allocated
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("utilizationRate")}
                      className="hover:bg-transparent"
                    >
                      Utilization
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("delegatorCount")}
                      className="hover:bg-transparent"
                    >
                      Delegators
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStrategies.map((strategy, index) => {
                  const tvs = parseFloat(strategy.tvs) / 1e18;
                  const encumbered =
                    parseFloat(strategy.encumbered || 0) / 1e18;
                  const available = tvs - encumbered;
                  const utilization = strategy.utilizationRate || 0;

                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-muted/50 cursor-pointer"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {strategy.name || "Unknown Strategy"}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {strategy.symbol ||
                              strategy.address?.slice(0, 10) + "..."}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{tvs.toFixed(4)} ETH</p>
                          <p className="text-xs text-muted-foreground">
                            ≈ ${(tvs * 2400).toLocaleString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {encumbered.toFixed(4)} ETH
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {((encumbered / tvs) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {available.toFixed(4)} ETH
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Unallocated
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {utilization.toFixed(1)}%
                            </span>
                            {utilization > 80 && (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            )}
                          </div>
                          <Progress value={utilization} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {strategy.delegatorCount || 0}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategiesTab;
