export default function BodyThree({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={"text-[18px] leading-[28px] tracking-normal " + className}>
      {children}
    </span>
  );
}
