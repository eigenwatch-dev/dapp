import { Badge } from "@/components/ui/badge";

export const RiskBadge = ({
  level = "CRITICAL",
  score = "0",
}: {
  level: string;
  score: string;
}) => {
  const colors = {
    LOW: "bg-green-500/10 text-green-500 border-green-500/20",
    MEDIUM: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    HIGH: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CRITICAL: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        className={`${
          colors[level as keyof typeof colors]
        } font-semibold capitalize`}
      >
        {`${level} RISK`.toLowerCase()}
      </Badge>
      <span className="text-sm text-muted-foreground">Score: {score}/100</span>
    </div>
  );
};
