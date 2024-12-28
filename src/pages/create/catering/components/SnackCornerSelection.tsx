import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { useCatering } from "../../../../hooks/use-catering";
import { SnackCorner } from "../../../../types/catering";

function SnackCornerSelection() {
  const {
    snackCorners,
    sandwiches,
    fruits,
    salad,
    setSandwiches,
    setFruits,
    setSalad,
  } = useCatering();

  const groupedSnacks = snackCorners.reduce(
    (acc: { [key: string]: SnackCorner[] }, snack) => {
      if (!acc[snack.category]) {
        acc[snack.category] = [];
      }
      acc[snack.category].push(snack);
      return acc;
    },
    {},
  );

  const handleSandwichSelection = (selectedSandWiches: string) => {
    if (sandwiches.includes(selectedSandWiches)) {
      setSandwiches(sandwiches.filter((item) => item !== selectedSandWiches)); // Deselect if already selected
    } else {
      setSandwiches([selectedSandWiches]);
    }
  };

  const handleFruitSelection = (selectedFruit: string) => {
    if (fruits.includes(selectedFruit)) {
      setFruits(fruits.filter((item) => item !== selectedFruit)); // Deselect if already selected
    } else if (fruits.length < 2) {
      setFruits([...fruits, selectedFruit]); // Allow selection if less than 2 fruits are selected
    }
  };

  const handleSaladSelection = (selectedSalad: string) => {
    if (salad.includes(selectedSalad)) {
      setSalad(salad.filter((item) => item !== selectedSalad)); // Deselect if already selected
    } else {
      setSalad([selectedSalad]);
    }
  };

  return (
    <Card className="p-6">
      <section>
        <h3 className="mb-3 text-xl font-bold">Picka Pick-A-Snack Corner</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(groupedSnacks).map(([category, snacks]) => (
            <Card key={category} className="shadow-lg">
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {snacks.map((dish, dishIndex) => (
                    <div key={dishIndex} className="flex items-center gap-3">
                      <Checkbox
                        value={dish.id}
                        id={`${category}-${dishIndex}`}
                        checked={
                          category === "Sandwich"
                            ? sandwiches.includes(dish.id)
                            : category === "Fruit"
                              ? fruits.includes(dish.id)
                              : salad.includes(dish.id)
                        }
                        onClick={() => {
                          if (category === "Sandwich") {
                            handleSandwichSelection(dish.id);
                          } else if (category === "Fruit") {
                            handleFruitSelection(dish.id);
                          } else if (category === "Salad Dressing") {
                            handleSaladSelection(dish.id);
                          }
                        }}
                        disabled={
                          category === "Fruit" &&
                          fruits.length >= 2 &&
                          !fruits.includes(dish.id)
                        }
                      />
                      <label
                        htmlFor={`${category}-${dishIndex}`}
                        className="text-sm"
                      >
                        {dish.name}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Card>
  );
}

export default SnackCornerSelection;
