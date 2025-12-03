/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/operator/tabs/AVSTab.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, TrendingUp, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/shared/data/StatCard";
import { SectionContainer } from "@/components/shared/data/SectionContainer";
import ReusableTable from "@/components/shared/table/ReuseableTable";

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

  console.log({ avsList });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  const registered = avsList?.filter((avs) => avs.status === "registered");
  const totalAllocated = avsList.reduce(
    (sum, avs) => sum + parseFloat(avs.totalAllocated || 0),
    0
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title={"Total AVS"}
          icon={<Shield />}
          value={avsList.length}
        />
        <StatCard
          title={"Active Registrations"}
          icon={<CheckCircle2 />}
          value={registered.length}
        />
        <StatCard
          title={"Avg Commission"}
          icon={<TrendingUp />}
          value={
            <>
              {(
                avsList.reduce((s, a) => s + (a.commission || 0), 0) /
                avsList.length
              ).toFixed(1)}
              %
            </>
          }
        />
      </div>

      <SectionContainer heading="AVS Relationships">
        <ReusableTable
          columns={[
            { key: "avs_name", displayName: "AVS Name" },
            { key: "status", displayName: "Status" },
            { key: "days_registered", displayName: "Days Registered" },
            { key: "operator_sets", displayName: "Operator Sets" },
            { key: "commissions", displayName: "Commission" },
          ]}
          data={avsList}
          tableFilters={{ title: "AVS Relationships" }}
        />
      </SectionContainer>
    </div>
  );
};
