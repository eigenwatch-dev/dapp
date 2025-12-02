export default function HeadingOne({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className={"text-[30px] leading-[40px] " + className}>{children}</h2>
  );
}
