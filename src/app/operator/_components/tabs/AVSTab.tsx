/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/operator/tabs/AVSTab.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, TrendingUp, CheckCircle2, ExternalLink } from "lucide-react";

interface AVSTabProps {
  operatorId: string;
  avsList: any[];
  isLoading: boolean;
}

export const AVSTab = ({
  operatorId,
  avsList = [],
  isLoading,
}: AVSTabProps) => {
  const [sortField, setSortField] = useState("daysRegistered");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  const registered = avsList.filter((avs) => avs.status === "registered");
  const totalAllocated = avsList.reduce(
    (sum, avs) => sum + parseFloat(avs.totalAllocated || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total AVS</p>
                <p className="text-2xl font-bold">{avsList.length}</p>
              </div>
              <Shield className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Registrations
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {registered.length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Commission</p>
                <p className="text-2xl font-bold">
                  {(
                    avsList.reduce((s, a) => s + (a.commission || 0), 0) /
                    avsList.length
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AVS Relationships</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>AVS Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days Registered</TableHead>
                <TableHead>Operator Sets</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {avsList.map((avs) => (
                <TableRow key={avs.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avs.logo} />
                        <AvatarFallback>{avs.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{avs.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {avs.website}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        avs.status === "registered" ? "default" : "secondary"
                      }
                    >
                      {avs.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{avs.daysRegistered}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{avs.operatorSetCount}</Badge>
                  </TableCell>
                  <TableCell>{avs.commission}%</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
