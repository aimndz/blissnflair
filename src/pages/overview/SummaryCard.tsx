import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="px-3 py-10 text-3xl font-semibold">
        {value}
      </CardContent>
      <CardHeader className="px-3 pb-3 pt-0">
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default SummaryCard;
