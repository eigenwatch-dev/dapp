export default function HeadingThree({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h4
      className={
        "text-[18px] max-sm:text-[16px] leading-[28px] tracking-tight " +
        className
      }
    >
      {children}
    </h4>
  );
}
