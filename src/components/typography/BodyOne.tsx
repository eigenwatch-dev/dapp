export default function BodyOne({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={"text-[14px] leading-[22px] tracking-normal " + className}>
      {children}
    </span>
  );
}
