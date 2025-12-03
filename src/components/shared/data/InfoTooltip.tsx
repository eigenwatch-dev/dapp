import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function InfoTooltip({ info }: { info: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="">
          <Info className="h-3 w-3 text-[#9F9FA9] cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
