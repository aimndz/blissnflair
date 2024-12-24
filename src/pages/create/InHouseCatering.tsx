import { Separator } from "../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import cateringDetails from "./cateringDetails";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Check, User2 } from "lucide-react";
import { useEffect, useState } from "react";

type Package = {
  numberOfDish: number;
  title: string;
  price: number;
  pax: number | { min: number; max: number };
};

function InHouseCatering() {
  const [expectedPax, setExpectedPax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [maxDishes, setMaxDishes] = useState(3);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [numberOfMainDishes, setNumberOfMainDishes] = useState(3);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [drinks, setDrinks] = useState<string[]>([]);
  const [desserts, setDesserts] = useState<string[]>([]);
  const [pastas, setPastas] = useState<string[]>([]);
  const [sandwiches, setSandwiches] = useState<string[]>([]);
  const [fruits, setFruits] = useState<string[]>([]);
  const [salad, setSalad] = useState<string[]>([]);
  const [foodCarts, setFoodCarts] = useState<
    Array<{
      title: string;
      price: number;
    }>
  >([]);
  const [technicals, setTechnicals] = useState<
    Array<{
      title: string;
      price: number;
    }>
  >([]);

  const handlePackageSelect = (pkg: Package) => {
    if (selectedPackage === pkg) {
      setSelectedPackage(null);
      setTotalAmount(0);
      setExpectedPax(0);
      return;
    } else {
      setSelectedPackage(pkg);
      setTotalAmount(pkg.price);
    }
  };

  const handleTabChange = (numberOfDishes: number) => {
    setMaxDishes(numberOfDishes);
    setSelectedDishes([]);
    setNumberOfMainDishes(numberOfDishes);
  };

  const handleDishSelection = (dish: string) => {
    const isSelected = selectedDishes.includes(dish);

    if (!isSelected && selectedDishes.length < maxDishes) {
      setSelectedDishes([...selectedDishes, dish]);
    } else if (isSelected) {
      setSelectedDishes(selectedDishes.filter((item) => item !== dish));
    }
  };

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

  const handleFoodCartSelection = (selectedCart: {
    title: string;
    price: number;
  }) => {
    const isSelected = foodCarts.some(
      (cart) => cart.title === selectedCart.title,
    );

    if (!isSelected) {
      setFoodCarts([...foodCarts, selectedCart]);
      setTotalAmount(totalAmount + selectedCart.price);
    } else {
      setFoodCarts(
        foodCarts.filter((cart) => cart.title !== selectedCart.title),
      );
      setTotalAmount(totalAmount - selectedCart.price);
    }
  };

  const handleTechnicalSelection = (selectedTech: {
    title: string;
    price: number;
  }) => {
    const isSelected = technicals.some(
      (tech) => tech.title === selectedTech.title,
    );

    if (!isSelected) {
      setTechnicals([...technicals, selectedTech]);
      setTotalAmount(totalAmount + selectedTech.price);
    } else {
      setTechnicals(
        technicals.filter((tech) => tech.title !== selectedTech.title),
      );
      setTotalAmount(totalAmount - selectedTech.price);
    }
  };

  useEffect(() => {
    // Calculate the cost for food carts and technicals
    const foodCartCost = foodCarts.reduce((sum, cart) => sum + cart.price, 0);
    const technicalCost = technicals.reduce((sum, tech) => sum + tech.price, 0);

    // Find the matching package
    const matchingPackage = cateringDetails.mainDishesPerPrice
      .find(
        (mainDish) => mainDish.packages[0].numberOfDish === numberOfMainDishes,
      )
      ?.packages.find(
        (pkg) =>
          typeof pkg.pax === "object" &&
          pkg.pax.min <= expectedPax &&
          pkg.pax.max >= expectedPax,
      );

    let packageCost = 0;
    if (matchingPackage) {
      packageCost = matchingPackage.price * expectedPax;
      setSelectedPackage(matchingPackage);
    }

    // Calculate the totalAmount based on foodCartCost, technicalCost, and packageCost
    setTotalAmount(foodCartCost + technicalCost + packageCost);
  }, [foodCarts, technicals, expectedPax, numberOfMainDishes]);

  return (
    <div className="space-y-3">
      <Card className="flex justify-between p-6">
        <div className="w-full max-w-72">
          <Label>Expected pax</Label>
          <Input
            placeholder="Expected pax"
            aria-label="Expected pax"
            value={expectedPax === 0 ? "" : expectedPax} // Show an empty string if the value is 0
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              setExpectedPax(value === "" ? 0 : Number(value)); // Handle empty input as 0
            }}
          />
        </div>
        <div>
          <p className="text-right text-sm">Total</p>
          <p className="text-2xl font-medium">PHP {totalAmount}</p>
        </div>
      </Card>
      <section className="flex flex-col gap-3 md:flex-row">
        <Card className="w-full p-6">
          <h3 className="mb-3 text-center text-xl font-semibold">
            Select number of main dishes
          </h3>
          <Tabs className="w-full" defaultValue="threeMainDishes">
            <div className="flex justify-center">
              <TabsList className="mb-3 flex w-full max-w-80 rounded-full border border-secondary-600 bg-transparent px-2 py-6">
                <TabsTrigger
                  value="threeMainDishes"
                  className="w-full rounded-full px-4 py-2 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
                  onClick={() => handleTabChange(3)}
                >
                  3 Main Dishes
                </TabsTrigger>
                <TabsTrigger
                  value="twoMainDishes"
                  className="w-full rounded-full px-4 py-2 text-secondary-900 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
                  onClick={() => handleTabChange(2)}
                >
                  <p>2 Main Dishes</p>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="threeMainDishes">
              <ToggleGroup
                type="single"
                className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-3"
                value={(() => {
                  const matchingPackage = cateringDetails.mainDishesPerPrice
                    .find((mainDish) => mainDish.packages[1].numberOfDish === 3)
                    ?.packages.find(
                      (pkg) =>
                        typeof pkg.pax === "object" &&
                        pkg.pax.min <= expectedPax &&
                        pkg.pax.max >= expectedPax,
                    );
                  return matchingPackage
                    ? `3-${matchingPackage.title}`
                    : undefined;
                })()}
              >
                {cateringDetails.mainDishesPerPrice.map((mainDish) =>
                  mainDish.packages[1].numberOfDish === 3
                    ? mainDish.packages.map((pkg, index) => (
                        <ToggleGroupItem
                          key={`${mainDish.packages[1].numberOfDish}-${pkg.title}-${index}`}
                          value={`${mainDish.packages[1].numberOfDish}-${pkg.title}`}
                          onClick={() => handlePackageSelect(pkg)} // Capture the selected package object
                          disabled={
                            expectedPax !== 0 &&
                            !(
                              typeof pkg.pax === "object" &&
                              pkg.pax.min <= expectedPax &&
                              pkg.pax.max >= expectedPax
                            )
                          }
                          className="flex h-24 flex-col border border-secondary-600"
                        >
                          <p className="text-xl font-medium">
                            ₱ {pkg.price} / pax
                          </p>
                          <p className="flex items-center gap-1 text-xs">
                            <User2 size={"12px"} />{" "}
                            <span>
                              {typeof pkg.pax === "object"
                                ? `${pkg.pax.min} - ${pkg.pax.max} pax`
                                : pkg.pax}
                            </span>
                          </p>
                        </ToggleGroupItem>
                      ))
                    : null,
                )}
              </ToggleGroup>
            </TabsContent>
            <TabsContent value="twoMainDishes">
              <ToggleGroup
                type="single"
                className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-3"
                value={(() => {
                  const matchingPackage = cateringDetails.mainDishesPerPrice
                    .find((mainDish) => mainDish.packages[0].numberOfDish === 2)
                    ?.packages.find(
                      (pkg) =>
                        typeof pkg.pax === "object" &&
                        pkg.pax.min <= expectedPax &&
                        pkg.pax.max >= expectedPax,
                    );
                  return matchingPackage
                    ? `2-${matchingPackage.title}`
                    : undefined; // Fallback if no package matches
                })()}
              >
                {cateringDetails.mainDishesPerPrice.map((mainDish) =>
                  mainDish.packages[0].numberOfDish === 2
                    ? mainDish.packages.map((pkg, index) => (
                        <ToggleGroupItem
                          key={`${mainDish.packages[0].numberOfDish}-${pkg.title}-${index}`}
                          value={`${mainDish.packages[0].numberOfDish}-${pkg.title}`}
                          onClick={() => handlePackageSelect(pkg)}
                          disabled={
                            expectedPax !== 0 &&
                            !(
                              typeof pkg.pax === "object" &&
                              pkg.pax.min <= expectedPax &&
                              pkg.pax.max >= expectedPax
                            )
                          }
                          className="flex h-24 flex-col border border-secondary-600"
                        >
                          <p className="text-xl font-medium">
                            ₱ {pkg.price} / pax
                          </p>
                          <p className="flex items-center gap-1 text-xs">
                            <User2 size={"12px"} />{" "}
                            <span>
                              {typeof pkg.pax === "object"
                                ? `${pkg.pax.min} - ${pkg.pax.max} pax`
                                : pkg.pax}
                            </span>
                          </p>
                        </ToggleGroupItem>
                      ))
                    : null,
                )}
              </ToggleGroup>
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="w-full p-6">
          <section className="flex flex-row gap-3 md:flex-col">
            <div className="w-full rounded-lg">
              <h3 className="text-medium font-semibold">Package</h3>
              <ul>
                {cateringDetails.packages.map((pkg, index) => (
                  <li key={index} className="text-xs">
                    <h3 className="text-sm font-medium">{pkg.title}</h3>
                    <ul>
                      {pkg.description.map((desc, index) => (
                        <li key={index} className="ml-4 flex gap-3">
                          {desc.title && <h3>{desc.title}:</h3>}
                          <p>{desc.description}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-3" />
            <div className="w-full">
              <h3 className="text-medium font-semibold">Inclusion </h3>
              <ul>
                {cateringDetails.inclusions.map((inclusion, index) => (
                  <li key={index} className="flex items-center gap-1 text-xs">
                    <span>
                      <Check size={"10px"} />
                    </span>
                    <p>{inclusion}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Card>
      </section>
      <Card className="p-6">
        <div>
          <h3 className="text-xl font-bold">Selection of Dishes</h3>
          <p className="mb-3">
            ({maxDishes - selectedDishes.length} dishes left)
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cateringDetails.allDishes.map((category) => (
              <Card key={category.category} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {category.dishes.map((dish, index) => (
                      <div key={index} className="flex space-x-2">
                        <Checkbox
                          value={dish}
                          id={`${category.category}-${index}`}
                          checked={selectedDishes.includes(dish)}
                          onClick={() => handleDishSelection(dish)}
                          disabled={
                            selectedDishes.length >= maxDishes &&
                            !selectedDishes.includes(dish)
                          }
                        />
                        <label
                          htmlFor={`${category.category}-${index}`}
                          className="text-sm"
                        >
                          {dish}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Separator className="my-6" />
        <section>
          <h3 className="mb-3 text-xl font-bold">Others</h3>
          <div className="grid grid-cols-3 gap-3">
            {/* Drinks Section */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Drinks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {cateringDetails.drinks.map((drink, index) => (
                      <div key={index} className="flex space-x-2">
                        <Checkbox
                          value={drink}
                          id={`drink-${index}`}
                          checked={drinks.includes(drink)} // Check if this drink is selected
                          onClick={() => handleDrinkSelection(drink)} // Handle selection
                        />
                        <label htmlFor={`drink-${index}`} className="text-sm">
                          {drink}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dessert Section */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Dessert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {cateringDetails.desserts.map((dessert, index) => (
                      <div key={index} className="flex space-x-2">
                        <Checkbox
                          value={dessert}
                          id={`dessert-${index}`}
                          checked={desserts.includes(dessert)} // Check if this dessert is selected
                          onClick={() => handleDessertSelection(dessert)} // Handle selection
                        />
                        <label htmlFor={`dessert-${index}`} className="text-sm">
                          {dessert}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pasta Section */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Pasta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {cateringDetails.pastas.map((pasta, index) => (
                      <div key={index} className="flex space-x-2">
                        <Checkbox
                          value={pasta}
                          id={`pasta-${index}`}
                          checked={pastas.includes(pasta)} // Check if this pasta is selected
                          onClick={() => handlePastaSelection(pasta)} // Handle selection
                        />
                        <label htmlFor={`pasta-${index}`} className="text-sm">
                          {pasta}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Card>
      <Card className="p-6">
        <section>
          <h3 className="mb-3 text-xl font-bold">Picka Pick-A-Snack Corner</h3>
          <div className="grid grid-cols-3 gap-3">
            {cateringDetails.pickA_pick_a_snack_corner.map((snack, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{snack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {snack.dishes.map((dish, dishIndex) => (
                      <div key={dishIndex} className="flex space-x-2">
                        <Checkbox
                          value={dish}
                          id={`${snack.category}-${dishIndex}`}
                          checked={
                            snack.category === "Sandwich"
                              ? sandwiches.includes(dish)
                              : snack.category === "Fruits"
                                ? fruits.includes(dish)
                                : salad.includes(dish)
                          }
                          onClick={() => {
                            if (snack.category === "Sandwich") {
                              handleSandwichSelection(dish);
                            } else if (snack.category === "Fruits") {
                              handleFruitSelection(dish);
                            } else if (snack.category === "Salad Dressing") {
                              handleSaladSelection(dish);
                            }
                          }}
                          disabled={
                            snack.category === "Fruits" &&
                            fruits.length >= 2 &&
                            !fruits.includes(dish)
                          }
                        />
                        <label
                          htmlFor={`${snack.category}-${dishIndex}`}
                          className="text-sm"
                        >
                          {dish}
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
      <Card className="p-6">
        <div>
          <h2 className="text-xl font-bold">Add ons</h2>
          <h3 className="mb-3 font-bold">Food Carts</h3>
          <div className="grid grid-cols-3 gap-3">
            {cateringDetails.addOns.map((addOn) =>
              addOn.allCarts?.map((cart, index) => (
                <Card key={index} className="mb-6 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <p>₱{cart.price} / cart </p>
                      <p className="text-sm">{cart.description}</p>
                      <p className="-mt-1 flex items-center gap-1 text-sm font-normal">
                        <User2 size={"13px"} /> <p> {cart.pax} pax </p>
                      </p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-4">
                      {cart.options.map((option, optIndex) => (
                        <div
                          key={`${cart.title}-${optIndex}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${cart.title}-${optIndex}`}
                            value={`${cart.title}-${option}`}
                            onClick={() =>
                              handleFoodCartSelection({
                                title: option,
                                price: cart.price,
                              })
                            }
                          />
                          <label
                            htmlFor={`${cart.title}-${optIndex}`}
                            className="text-sm"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )),
            )}
          </div>
          <Separator className="my-6" />
          <h3 className="mb-3 font-bold">Technicals</h3>
          <ToggleGroup type="multiple" className="grid grid-cols-3 gap-3">
            {cateringDetails.addOns.map((addOn) =>
              addOn.allTechs?.map((cart, index) => (
                <ToggleGroupItem
                  key={index}
                  value={cart.title}
                  className="flex h-28 flex-col items-start rounded-lg border p-5 shadow-lg"
                  onClick={() =>
                    handleTechnicalSelection({
                      title: cart.title,
                      price: cart.price,
                    })
                  }
                >
                  <p className="text-xl font-semibold">{cart.title}</p>
                  <p className="text-xl font-medium">
                    ₱{cart.price} /{" "}
                    <span className="text-medium">{cart.hour} hrs</span>
                  </p>
                  <p className="text-sm">{cart.description}</p>
                </ToggleGroupItem>
              )),
            )}
          </ToggleGroup>
        </div>
      </Card>
    </div>
  );
}

export default InHouseCatering;
