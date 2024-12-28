import { Check } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useCatering } from "../../../../hooks/use-catering";

function AdditionalDetails() {
  const { packageDetails, inclusions } = useCatering();

  return (
    <Card className="w-full p-6">
      <section className="flex flex-row gap-3 md:flex-col">
        <div className="w-full rounded-lg">
          <h3 className="text-medium font-semibold">Package</h3>
          <ul>
            {packageDetails.map((pkg) => (
              <li key={pkg.id} className="text-xs">
                <h3 className="text-sm font-medium">{pkg.title}</h3>
                <ul>
                  <li>{pkg.description}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-3" />
        <div className="w-full">
          <h3 className="text-medium font-semibold">Inclusion</h3>
          <ul>
            {inclusions.map((inclusion, index) => (
              <li key={index} className="flex items-center gap-1 text-xs">
                <span>
                  <Check size={"10px"} />
                </span>
                <p>{inclusion.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Card>
  );
}

export default AdditionalDetails;
