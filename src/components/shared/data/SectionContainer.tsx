import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SectionContainer({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow p-[18px] rounded-[11.03px] w-full">
      <CardHeader className="p-0">
        <CardTitle className="text-[#9F9FA9]">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-full">{children}</CardContent>
    </Card>
  );
}
