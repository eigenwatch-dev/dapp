// components/operator/OperatorProfile.tsx
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Shield,
  AlertTriangle,
  Copy,
  ExternalLink,
  Info,
  CheckCircle2,
} from "lucide-react";
import {
  useOperator,
  useOperatorStats,
  useOperatorActivity,
} from "@/hooks/crud/useOperator";
import OverviewTab from "./tabs/OverviewTab";
import StrategiesTab from "./tabs/StrategiesTab";
import { useOperatorCommission } from "@/hooks/crud/commission";
import { useAllocationsOverview } from "@/hooks/crud/useAllocation";
import { useOperatorAVS } from "@/hooks/crud/useAvs";
import { useOperatorDelegators } from "@/hooks/crud/useDelegators";
import { useRiskAssessment } from "@/hooks/crud/useOperatorRisk";
import { useOperatorStrategies } from "@/hooks/crud/useStrategy";
import { formatEther } from "@/lib/formatting";
import { AllocationsTab } from "./tabs/AllocationsTab";
import { AVSTab } from "./tabs/AVSTab";
import { CommissionTab } from "./tabs/CommissionTab";
import { DelegatorsTab } from "./tabs/DelegatorsTab";
import { RiskAnalysisTab } from "./tabs/RiskAnalysisTab";
import { Strategy } from "@/types/strategy.types";
import { AVS } from "@/types/avs.types";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
  tooltip: string;
  isLoading?: boolean;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  tooltip,
  isLoading,
}: StatCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{title}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 mt-3 text-xs ${
              trend > 0
                ? "text-green-500"
                : trend < 0
                ? "text-red-500"
                : "text-muted-foreground"
            }`}
          >
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : trend < 0 ? (
              <TrendingDown className="h-3 w-3" />
            ) : null}
            <span>
              {trend > 0 ? "+" : ""}
              {trend}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const RiskBadge = ({ level, score }: { level: string; score: string }) => {
  const colors = {
    LOW: "bg-green-500/10 text-green-500 border-green-500/20",
    MEDIUM: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    HIGH: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className={`${colors[level as keyof typeof colors]} font-semibold`}
      >
        {level} RISK
      </Badge>
      <span className="text-sm text-muted-foreground">Score: {score}/100</span>
    </div>
  );
};

const OperatorProfile = () => {
  const params = useParams();
  const operatorId = params?.operator_id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  // Fetch all data
  const { data: operatorData, isLoading: loadingOperator } =
    useOperator(operatorId);
  const { data: statsData, isLoading: loadingStats } =
    useOperatorStats(operatorId);
  const { data: activityData, isLoading: loadingActivity } =
    useOperatorActivity(operatorId, { limit: 10 });
  const { data: strategiesData, isLoading: loadingStrategies } =
    useOperatorStrategies(operatorId);
  const { data: avsData, isLoading: loadingAVS } = useOperatorAVS(operatorId);
  const { data: delegatorsData, isLoading: loadingDelegators } =
    useOperatorDelegators(operatorId, { limit: 20 });
  const { data: commissionData, isLoading: loadingCommission } =
    useOperatorCommission(operatorId);
  const { data: riskData, isLoading: loadingRisk } =
    useRiskAssessment(operatorId);
  const { data: allocationsData, isLoading: loadingAllocations } =
    useAllocationsOverview(operatorId);

  const operator = operatorData;
  const stats = statsData?.data;

  const copyAddress = () => {
    if (operator?.operator_address) {
      navigator.clipboard.writeText(operator.operator_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loadingOperator) {
    return (
      <div className="min-h-screen bg-background p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-20 w-20 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!operator) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-2">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-xl font-semibold">Operator Not Found</h2>
            <p className="text-sm text-muted-foreground">
              The operator you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 rounded-xl border-2 border-border">
              <AvatarImage src={operator.metadata?.logo} />
              <AvatarFallback className="rounded-xl bg-primary/10 text-2xl">
                {operator.metadata?.name?.[0] || "O"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold">
                  {operator.metadata?.name || "Anonymous Operator"}
                </h1>
                <Badge
                  variant={operator.is_active ? "default" : "secondary"}
                  className="gap-1"
                >
                  {operator.is_active ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </>
                  ) : (
                    "Inactive"
                  )}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {operator.operator_address.slice(0, 10)}...
                  {operator.operator_address.slice(-8)}
                </span>
                <Button variant="ghost" size="sm" onClick={copyAddress}>
                  {copied ? (
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
                {operator.metadata?.website && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={operator.metadata.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>

              {operator.metadata?.description && (
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {operator.metadata.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Compare
            </Button>
            <Button variant="outline" size="sm">
              Watch
            </Button>
            <Button size="sm">Delegate</Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Value Secured"
          value={formatEther(operator.total_tvs)}
          subtitle="Assets under management"
          icon={Activity}
          tooltip="The total value of assets delegated to this operator. A higher TVS indicates more trust from stakers."
          isLoading={loadingStats}
        />

        <StatCard
          title="Delegators"
          value={operator.delegator_count}
          subtitle={`${operator.delegator_count} active stakers`}
          icon={Users}
          tooltip="A staker delegates their assets to an operator they trust. The operator uses this delegation to provide services."
          isLoading={loadingStats}
        />

        <StatCard
          title="Active AVS"
          value={operator.active_avs_count}
          subtitle="Registered services"
          icon={Shield}
          tooltip="An AVS is a protocol that uses EigenLayer for security. Operators register with AVSs to provide validation services."
          isLoading={loadingStats}
        />

        <StatCard
          title="Operational Days"
          value={operator.operational_days}
          subtitle={`≈ ${Math.floor(operator.operational_days / 30)} months`}
          icon={TrendingUp}
          tooltip="The number of days this operator has been actively operating. Longer operational history can indicate more experience."
          isLoading={loadingStats}
        />
      </div>

      {/* Risk & Commission Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Risk Assessment
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">
                        An overall risk assessment score. Higher scores indicate
                        safer operators with better track records.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <RiskBadge
                level={operator.risk_level}
                score={operator.risk_score}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Commission Rate
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          The fee the operator charges for their services.
                          Measured in bips (1 bip = 0.01%). For example, 1000
                          bips = 10%.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-semibold">
                  {operator.current_pi_commission_bips / 100}%
                </span>
              </div>
              <Progress
                value={operator.current_pi_commission_bips / 100}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Slashing Events
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          A penalty applied when an operator fails to perform
                          their duties or acts maliciously. Slashed operators
                          lose assets.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    operator.total_slash_events > 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {operator.total_slash_events}
                </span>
              </div>
              {operator.total_slash_events > 0 ? (
                <div className="flex items-center gap-2 text-xs text-red-500">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Historical slashing detected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-green-500">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>No slashing events</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="avs">AVS</TabsTrigger>
          <TabsTrigger value="delegators">Delegators</TabsTrigger>
          <TabsTrigger value="allocations">Allocations</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            operator={operator}
            stats={stats}
            activity={activityData?.data}
            isLoading={loadingActivity}
          />
        </TabsContent>

        <TabsContent value="strategies">
          <StrategiesTab
            operatorId={operatorId}
            strategies={strategiesData?.data as Strategy[]}
            isLoading={loadingStrategies}
          />
        </TabsContent>

        <TabsContent value="avs">
          <AVSTab
            operatorId={operatorId}
            avsList={avsData?.data as AVS[]}
            isLoading={loadingAVS}
          />
        </TabsContent>

        <TabsContent value="delegators">
          <DelegatorsTab
            operatorId={operatorId}
            delegators={delegatorsData?.data}
            isLoading={loadingDelegators}
          />
        </TabsContent>

        <TabsContent value="allocations">
          <AllocationsTab
            operatorId={operatorId}
            allocations={allocationsData?.data}
            isLoading={loadingAllocations}
          />
        </TabsContent>

        <TabsContent value="commission">
          <CommissionTab
            operatorId={operatorId}
            commission={commissionData?.data}
            isLoading={loadingCommission}
          />
        </TabsContent>

        <TabsContent value="risk">
          <RiskAnalysisTab
            operatorId={operatorId}
            risk={riskData?.data}
            isLoading={loadingRisk}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperatorProfile;
