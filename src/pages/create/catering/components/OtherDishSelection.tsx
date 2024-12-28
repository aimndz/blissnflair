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

  const handleDrinkSelection = (selectedDrink: string) => {
    if (drinks.includes(selectedDrink)) {
      setDrinks(drinks.filter((item) => item !== selectedDrink)); // Deselect if already selected
    } else {
      setDrinks([selectedDrink]);
    }
  };

  const handleDessertSelection = (selectedDessert: string) => {
    if (desserts.includes(selectedDessert)) {
      setDesserts(desserts.filter((item) => item !== selectedDessert)); // Deselect if already selected
    } else {
      setDesserts([selectedDessert]);
    }
  };

  const handlePastaSelection = (selectedPasta: string) => {
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
                          ? drinks.includes(dish.id)
                          : category === "Dessert"
                            ? desserts.includes(dish.id)
                            : category === "Pasta"
                              ? pastas.includes(dish.id)
                              : selectedDishes.includes(dish.id) // Fallback for other categories
                      }
                      onClick={() => {
                        if (category === "Drink") {
                          handleDrinkSelection(dish.id);
                        } else if (category === "Dessert") {
                          handleDessertSelection(dish.id);
                        } else if (category === "Pasta") {
                          handlePastaSelection(dish.id);
                        }
                      }}
                      disabled={
                        (category === "Drink" &&
                          drinks.length >= 1 &&
                          !drinks.includes(dish.id)) ||
                        (category === "Dessert" &&
                          desserts.length >= 1 &&
                          !desserts.includes(dish.id)) ||
                        (category === "Pasta" &&
                          pastas.length >= 1 &&
                          !pastas.includes(dish.id))
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
