export default function BodySix({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={"text-[12px] leading-[14px] " + className}>
      {children}
    </span>
  );
}
