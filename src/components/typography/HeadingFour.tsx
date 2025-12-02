export default function HeadingFour({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h4
      className={
        "text-[20px] max-sm:text-[12px] max-sm:leading-[22px] leading-[28px] tracking-tight " +
        className
      }
    >
      {children}
    </h4>
  );
}
