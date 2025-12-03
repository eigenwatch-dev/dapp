import { Progress } from "@/components/ui/progress";

export function MetricProgress({
  metric,
  value,
}: {
  metric: string;
  value: number;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#9F9FA9]">{metric}</span>
      <div className="flex items-center gap-2">
        <Progress value={value} className="h-1.5 w-20 bg-[#9F9FA9]/10" />
        <span className="font-medium w-12 text-right text-[#9F9FA9]">
          {value}%
        </span>
      </div>
    </div>
  );
}
