export default function HeadingTwo({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={
        "text-[24px] max-sm:text-[20px] leading-[36px] max-sm:leading-[32px] tracking-normal " +
        className
      }
    >
      {children}
    </h3>
  );
}
