import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { useCatering } from "../../../../hooks/use-catering";
import { MainDish } from "../../../../types/catering";

function OtherDishSelection() {
  const {
    mainDishes,
    drinks,
    desserts,
    pastas,
    selectedDishes,
    setDrinks,
    setDesserts,
    setPastas,
  } = useCatering();

  const filteredOthers = mainDishes.filter(
    (dish) => dish.dishType === "OTHERS",
  );

  const groupedOthers = filteredOthers.reduce(
    (acc: { [key: string]: MainDish[] }, dish) => {
      if (!acc[dish.category]) {
        acc[dish.category] = [];
      }
      acc[dish.category].push(dish);
      return acc;
    },
    {},
  );

  const handleDrinkSelection = (selectedDrink: MainDish) => {
    if (drinks.includes(selectedDrink)) {
      setDrinks(drinks.filter((item) => item !== selectedDrink)); // Deselect if already selected
    } else {
      setDrinks([selectedDrink]);
    }
  };

  const handleDessertSelection = (selectedDessert: MainDish) => {
    if (desserts.includes(selectedDessert)) {
      setDesserts(desserts.filter((item) => item !== selectedDessert)); // Deselect if already selected
    } else {
      setDesserts([selectedDessert]);
    }
  };

  const handlePastaSelection = (selectedPasta: MainDish) => {
    if (pastas.includes(selectedPasta)) {
      setPastas(pastas.filter((item) => item !== selectedPasta)); // Deselect if already selected
    } else {
      setPastas([selectedPasta]);
    }
  };

  return (
    <>
      <h3 className="mb-3 text-xl font-bold">Others</h3>
      <div className="grid grid-cols-3 gap-3">
        {/* Other Categories */}
        {Object.entries(groupedOthers).map(([category, dishes]) => (
          <Card key={category} className="shadow-lg">
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {dishes.map((dish, index) => (
                  <div key={dish.id} className="flex space-x-2">
                    <Checkbox
                      value={dish.id}
                      id={`${category}-${index}`}
                      checked={
                        category === "Drink"
                          ? drinks.includes(dish)
                          : category === "Dessert"
                            ? desserts.includes(dish)
                            : category === "Pasta"
                              ? pastas.includes(dish)
                              : selectedDishes.includes(dish) // Fallback for other categories
                      }
                      onClick={() => {
                        if (category === "Drink") {
                          handleDrinkSelection(dish);
                        } else if (category === "Dessert") {
                          handleDessertSelection(dish);
                        } else if (category === "Pasta") {
                          handlePastaSelection(dish);
                        }
                      }}
                      disabled={
                        (category === "Drink" &&
                          drinks.length >= 1 &&
                          !drinks.includes(dish)) ||
                        (category === "Dessert" &&
                          desserts.length >= 1 &&
                          !desserts.includes(dish)) ||
                        (category === "Pasta" &&
                          pastas.length >= 1 &&
                          !pastas.includes(dish))
                      }
                    />
                    <label htmlFor={`${category}-${index}`} className="text-sm">
                      {dish.name}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default OtherDishSelection;
