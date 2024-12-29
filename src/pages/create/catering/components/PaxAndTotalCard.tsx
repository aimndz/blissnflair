import { Card } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useCatering } from "../../../../hooks/use-catering";
import { formatCurrency } from "../../../../utils/formatCurrency";

function PaxAndTotalCard() {
  const { expectedPax, totalAmount, setExpectedPax } = useCatering();

  return (
    <Card className="flex justify-between p-6">
      <div className="w-full max-w-72">
        <Label>Expected pax</Label>
        <Input
          placeholder="Expected pax"
          aria-label="Expected pax"
          value={expectedPax === 0 ? "" : expectedPax} // Show an empty string if the value is 0
          type="number"
          onChange={(e) => {
            const value = e.target.value;
            setExpectedPax(value === "" ? 0 : Number(value)); // Handle empty input as 0
          }}
        />
      </div>
      <div>
        <p className="text-right text-sm">Total</p>
        <p className="text-2xl font-medium">
          PHP {formatCurrency(totalAmount)}
        </p>
      </div>
    </Card>
  );
}

export default PaxAndTotalCard;
