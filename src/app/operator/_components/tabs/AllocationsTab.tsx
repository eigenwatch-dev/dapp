/* eslint-disable @typescript-eslint/no-unused-vars */
import { SectionContainer } from "@/components/shared/data/SectionContainer";
import { StatCard } from "@/components/shared/data/StatCard";
import ReusableTable from "@/components/shared/table/ReuseableTable";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AllocationsOverview } from "@/types/allocation.types";

// components/operator/tabs/AllocationsTab.tsx
interface AllocationsTabProps {
  operatorId: string;
  allocations?: AllocationsOverview;
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

  console.log({ allocations });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Total Allocated"
          value={<>{allocations?.total_allocations || 0} ETH</>}
        />
        <StatCard
          title="Total Encumbered Magnitude"
          value={<>{allocations?.total_encumbered_magnitude || 0} ETH</>}
        />
      </div>

      <SectionContainer heading="Allocations by AVS">
        <ReusableTable
          columns={[
            { key: "avs_name", displayName: "AVS" },
            { key: "status", displayName: "Total Magnitude" },
            { key: "operator_sets", displayName: "Strategies" },
          ]}
          data={allocations?.by_avs || []}
          tableFilters={{ title: "Allocations by AVS" }}
        />
      </SectionContainer>
    </div>
  );
};
