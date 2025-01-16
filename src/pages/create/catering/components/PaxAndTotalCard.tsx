import { Card } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useCatering } from "../../../../hooks/use-catering";
import { formatCurrency } from "../../../../utils/formatCurrency";
import LabelSection from "./LabelSection";

function PaxAndTotalCard() {
  const { expectedPax, totalAmount, setExpectedPax } = useCatering();

  return (
    <Card className="p-6">
      <LabelSection
        text={"Please specify expected pax first for better amount computation"}
      />
      <div className="flex flex-col-reverse gap-3">
        <div className="w-full">
          <Label>Expected pax</Label>
          <Input
            className="w-full rounded-lg"
            placeholder="Expected pax"
            aria-label="Expected pax"
            value={expectedPax === 0 ? "" : expectedPax} // Show an empty string if the value is 0
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value === "" ? 0 : Number(value);
              if (numericValue <= 200) {
                setExpectedPax(numericValue); // Only update if the value is <= 200
              }
            }}
          />
        </div>
        <div>
          <p className="text-center text-sm">Total</p>
          <p className="text-center text-2xl font-medium">
            PHP {formatCurrency(totalAmount)}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default PaxAndTotalCard;
