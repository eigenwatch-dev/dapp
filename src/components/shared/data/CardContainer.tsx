import { Card, CardContent } from "@/components/ui/card";

export function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <Card className="hover:shadow-md transition-shadow p-[18px] rounded-[11.03px] w-full">
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
