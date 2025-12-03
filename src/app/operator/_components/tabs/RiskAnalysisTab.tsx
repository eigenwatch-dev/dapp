/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "lucide-react";

// components/operator/tabs/RiskAnalysisTab.tsx
interface RiskAnalysisTabProps {
  operatorId: string;
  risk: any;
  isLoading: boolean;
}

export const RiskAnalysisTab = ({
  operatorId,
  risk,
  isLoading,
}: RiskAnalysisTabProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  console.log({ risk });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Risk Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Concentration Risk</span>
              <span className="font-semibold">
                {risk?.components?.concentrationRisk || 0}/100
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${risk?.components?.concentrationRisk || 0}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Volatility Risk</span>
              <span className="font-semibold">
                {risk?.components?.volatilityRisk || 0}/100
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${risk?.components?.volatilityRisk || 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Slashing History</span>
              <span className="font-semibold">
                {risk?.components?.slashingHistory || 0}/100
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${risk?.components?.slashingHistory || 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Operational Stability</span>
              <span className="font-semibold">
                {risk?.components?.operationalStability || 0}/100
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${risk?.components?.operationalStability || 0}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Delegation HHI
              </span>
              <span className="font-medium">
                {risk?.metrics?.delegationHHI || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                TVS Volatility (30d)
              </span>
              <span className="font-medium">
                {risk?.metrics?.tvsVolatility30d || 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Slashing Count
              </span>
              <span className="font-medium">
                {risk?.metrics?.slashingCount || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="font-medium">
                {risk?.metrics?.uptimePercentage || 0}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-4xl font-bold mb-2">
                {risk?.overallScore || 0}
              </div>
              <p className="text-sm text-muted-foreground">
                Overall Risk Score
              </p>
              <Badge className="mt-4">
                {new Date(risk?.assessmentDate).toLocaleDateString()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
