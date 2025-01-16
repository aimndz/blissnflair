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
    const isSelected = drinks.some((drink) => drink.id === selectedDrink.id);

    if (!isSelected) {
      setDrinks([selectedDrink]);
    } else {
      setDrinks(drinks.filter((item) => item.id !== selectedDrink.id));
    }
  };

  const handleDessertSelection = (selectedDessert: MainDish) => {
    const isSelected = desserts.some(
      (dessert) => dessert.id === selectedDessert.id,
    );

    if (!isSelected) {
      setDesserts([selectedDessert]);
    } else {
      setDesserts(desserts.filter((item) => item.id !== selectedDessert.id));
    }
  };

  const handlePastaSelection = (selectedPasta: MainDish) => {
    const isSelected = pastas.some((pasta) => pasta.id === selectedPasta.id);

    if (!isSelected) {
      setPastas([selectedPasta]);
    } else {
      setPastas(pastas.filter((item) => item.id !== selectedPasta.id));
    }
  };

  return (
    <>
      <h3 className="mb-3 text-xl font-bold">Others</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
                          ? drinks.some((drink) => drink.id === dish.id)
                          : category === "Dessert"
                            ? desserts.some((dessert) => dessert.id === dish.id)
                            : category === "Pasta"
                              ? pastas.some((pasta) => pasta.id === dish.id)
                              : selectedDishes.some(
                                  (selectedDish) => selectedDish.id === dish.id,
                                )
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
                          !drinks.some((drink) => drink.id === dish.id)) ||
                        (category === "Dessert" &&
                          desserts.length >= 1 &&
                          !desserts.some(
                            (dessert) => dessert.id === dish.id,
                          )) ||
                        (category === "Pasta" &&
                          pastas.length >= 1 &&
                          !pastas.some((pasta) => pasta.id === dish.id))
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
