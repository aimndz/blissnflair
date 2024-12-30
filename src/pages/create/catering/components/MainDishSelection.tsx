import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { useCatering } from "../../../../hooks/use-catering";
import { MainDish } from "../../../../types/catering";

function MainDishSelection() {
  const { mainDishes, maxDishes, selectedDishes, setSelectedDishes } =
    useCatering();

  const handleDishSelection = (dish: MainDish) => {
    const isSelected = selectedDishes.some(
      (selectedDish) => selectedDish.id === dish.id,
    );

    if (!isSelected && selectedDishes.length < maxDishes) {
      setSelectedDishes([...selectedDishes, dish]);
    } else if (isSelected) {
      setSelectedDishes(selectedDishes.filter((item) => item.id !== dish.id));
    }
  };

  const filteredMainDishes = mainDishes.filter(
    (dish) => dish.dishType === "MAIN",
  );

  const groupedMainDishes = filteredMainDishes.reduce(
    (acc: { [key: string]: MainDish[] }, dish) => {
      if (!acc[dish.category]) {
        acc[dish.category] = [];
      }
      acc[dish.category].push(dish);
      return acc;
    },
    {},
  );

  return (
    <>
      <h3 className="text-xl font-bold">Selection of Dishes</h3>
      <p className="mb-3">({maxDishes - selectedDishes.length} dishes left)</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedMainDishes).map(([category, dishes]) => (
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
                      checked={selectedDishes.some(
                        (selectedDish) => selectedDish.id === dish.id,
                      )}
                      onClick={() => handleDishSelection(dish)}
                      disabled={
                        dish.dishType === "MAIN" &&
                        selectedDishes.filter(
                          (selectedDish) => selectedDish.dishType === "MAIN",
                        ).length >= maxDishes &&
                        !selectedDishes.some(
                          (selectedDish) => selectedDish.id === dish.id,
                        )
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

export default MainDishSelection;
