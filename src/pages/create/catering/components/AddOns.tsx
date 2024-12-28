import { Card } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useCatering } from "../../../../hooks/use-catering";
import { AddOn } from "../../../../types/catering";
import FoodCartSelection from "./FoodCartSelection";
import TechnicalSelection from "./TechnicalSelection";

function AddOns() {
  const { addOns } = useCatering();

  const groupedAddOns = addOns.reduce(
    (acc: { [key: string]: AddOn[] }, addOn) => {
      if (!acc[addOn.category]) {
        acc[addOn.category] = [];
      }
      acc[addOn.category].push(addOn);
      return acc;
    },
    {} as { [key: string]: AddOn[] },
  );

  return (
    <Card className="p-6">
      <div>
        <h2 className="text-xl font-bold">Add ons</h2>
        <FoodCartSelection groupedAddOns={groupedAddOns} />
        <Separator className="my-6" />
        <TechnicalSelection groupedAddOns={groupedAddOns} />
      </div>
    </Card>
  );
}

export default AddOns;
