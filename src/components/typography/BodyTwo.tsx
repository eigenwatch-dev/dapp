export default function BodyTwo({
  className,
  children,
  mobileSize,
}: {
  className?: string;
  mobileSize?: 12;
  children: React.ReactNode;
}) {
  return (
    <span
      className={
        "text-[16px] leading-[24px] max-sm:leading-[22px] tracking-normal " +
        (mobileSize === 12 ? "max-sm:text-[12px] " : "max-sm:text-[14px] ") +
        className
      }
    >
      {children}
    </span>
  );
}
