import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { useCatering } from "../../../../hooks/use-catering";
import { AddOn } from "../../../../types/catering";

function TechnicalSelection({
  groupedAddOns,
}: {
  groupedAddOns: { [key: string]: AddOn[] };
}) {
  const { technicals, totalAmount, setTechnicals, setTotalAmount } =
    useCatering();

  const handleTechnicalSelection = (selectedTech: AddOn) => {
    const isSelected = technicals.some((tech) => tech.id === selectedTech.id);

    if (!isSelected) {
      setTechnicals([...technicals, selectedTech]);
      setTotalAmount(totalAmount + selectedTech.price);
    } else {
      setTechnicals(technicals.filter((tech) => tech.id !== selectedTech.id));
      setTotalAmount(totalAmount - selectedTech.price);
    }
  };

  return (
    <>
      <h3 className="mb-3 font-bold">Technicals</h3>
      <ToggleGroup type="multiple" className="grid grid-cols-3 gap-3">
        {Object.entries(groupedAddOns).map(([category, items]) => {
          if (category === "Technicals") {
            return items.map((cart) => {
              const isSelected = technicals.some((tech) => tech.id === cart.id);
              return (
                <ToggleGroupItem
                  key={cart.id}
                  value={cart.id}
                  data-state={isSelected ? "on" : "off"}
                  className={`flex h-28 flex-col items-start rounded-lg border p-5 shadow-lg ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleTechnicalSelection(cart)}
                >
                  <p className="text-xl font-semibold">{cart.name}</p>
                  <p className="text-xl font-medium">
                    ₱{cart.price} /{" "}
                    <span className="text-medium">{cart.serviceHours} hrs</span>{" "}
                  </p>
                  <p className="text-sm">{cart.description}</p>
                </ToggleGroupItem>
              );
            });
          }
          return null;
        })}
      </ToggleGroup>
    </>
  );
}

export default TechnicalSelection;
