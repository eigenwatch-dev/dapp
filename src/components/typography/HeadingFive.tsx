export default function HeadingFive({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={
        "text-[22px] max-sm:text-[20px] leading-[36px] max-sm:leading-[30px] tracking-normal " +
        className
      }
    >
      {children}
    </h3>
  );
}
