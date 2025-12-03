/* eslint-disable @typescript-eslint/no-unused-vars */
import { SectionContainer } from "@/components/shared/data/SectionContainer";
import { StatCard } from "@/components/shared/data/StatCard";
import ReusableTable from "@/components/shared/table/ReuseableTable";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CommissionOverview } from "@/types/commission.types";

// components/operator/tabs/CommissionTab.tsx
interface CommissionTabProps {
  operatorId: string;
  commission?: CommissionOverview;
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

  console.log({ commission });

  return (
    <div className="space-y-4">
      <StatCard
        title="Protocol-wide Commission (PI)"
        value={<>{commission?.pi_commission || 0}%</>}
        subtitle={"Standard commission applied across all AVS"}
      />

      <SectionContainer heading="Per-AVS Commissions">
        <ReusableTable
          columns={[
            { key: "avs_name", displayName: "AVS" },
            { key: "status", displayName: "Commission Rate" },
          ]}
          data={commission?.avs_commissions || []}
          tableFilters={{ title: "Per-AVS Commissions" }}
        />
      </SectionContainer>
    </div>
  );
};
