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

  const handleSandwichSelection = (selectedSandwich: SnackCorner) => {
    const isSelected = sandwiches.some(
      (sandwich) => sandwich.id === selectedSandwich.id,
    );

    if (isSelected) {
      setSandwiches(
        sandwiches.filter((item) => item.id !== selectedSandwich.id),
      );
    } else {
      setSandwiches([selectedSandwich]);
    }
  };

  const handleFruitSelection = (selectedFruit: SnackCorner) => {
    const isSelected = fruits.some((fruit) => fruit.id === selectedFruit.id);

    if (isSelected) {
      setFruits(fruits.filter((item) => item.id !== selectedFruit.id));
    } else if (fruits.length < 2) {
      setFruits([...fruits, selectedFruit]);
    }
  };

  const handleSaladSelection = (selectedSalad: SnackCorner) => {
    const isSelected = salad.some(
      (saladItem) => saladItem.id === selectedSalad.id,
    );

    if (isSelected) {
      setSalad(salad.filter((item) => item.id !== selectedSalad.id));
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
                            ? sandwiches.some(
                                (sandwich) => sandwich.id === dish.id,
                              )
                            : category === "Fruit"
                              ? fruits.some((fruit) => fruit.id === dish.id)
                              : salad.some((sld) => sld.id === dish.id)
                        }
                        onClick={() => {
                          if (category === "Sandwich") {
                            handleSandwichSelection(dish);
                          } else if (category === "Fruit") {
                            handleFruitSelection(dish);
                          } else if (category === "Salad Dressing") {
                            handleSaladSelection(dish);
                          }
                        }}
                        disabled={
                          (category === "Sandwich" &&
                            sandwiches.length >= 1 &&
                            !sandwiches.some(
                              (sandwich) => sandwich.id === dish.id,
                            )) ||
                          (category === "Fruit" &&
                            fruits.length >= 2 &&
                            !fruits.some((fruit) => fruit.id === dish.id)) ||
                          (category === "Salad" &&
                            salad.length >= 1 &&
                            !salad.some((sld) => sld.id === dish.id))
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
