import { InfoTooltip } from "./InfoTooltip";

export function InfoHeading({
  heading,
  info,
}: {
  heading: string;
  info?: string;
}) {
  return (
    <div className="flex items-center gap-2 h-fit">
      <p className="text-[14px] text-[#9F9FA9] ">{heading}</p>
      {info && <InfoTooltip info={info} />}
    </div>
  );
}
