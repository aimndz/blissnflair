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
  CardDescription,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { User2 } from "lucide-react";

function InHouseCatering() {
  return (
    <div className="space-y-3">
      <Card className="flex justify-between p-6">
        <div className="w-full max-w-72">
          <Label>Expected pax</Label>
          <Input placeholder="Expected pax" aria-label="Expected pax" />
        </div>
        <div>
          <p className="text-sm">Est. Price</p>
          <p className="text-2xl font-medium">Php 2,000.00</p>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="mb-3 text-center text-xl font-semibold">
          Select number of main dishes
        </h3>
        <Tabs className="w-full" defaultValue="threeMainDishes">
          <div className="flex justify-center">
            <TabsList className="mb-3 flex w-full max-w-80 rounded-full border border-secondary-600 bg-transparent px-2 py-6">
              <TabsTrigger
                value="threeMainDishes"
                className="w-full rounded-full px-4 py-2 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
              >
                3 Main Dishes
              </TabsTrigger>
              <TabsTrigger
                value="twoMainDishes"
                className="w-full rounded-full px-4 py-2 text-secondary-900 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
              >
                <p>2 Main Dishes</p>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="twoMainDishes">
            <ToggleGroup
              type="single"
              className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-3"
            >
              {cateringDetails.mainDishesPerPrice.map((mainDish) =>
                mainDish.numberOfDish === 2 // Filter for twoMainDishes
                  ? mainDish.packages.map((pkg, index) => (
                      <ToggleGroupItem
                        key={`${mainDish.numberOfDish}-${pkg.title}-${index}`}
                        value={`${mainDish.numberOfDish}-${pkg.title}`}
                        className="flex h-24 flex-col border border-secondary-600"
                      >
                        <p className="text-xl font-medium">₱ {pkg.price}</p>
                        <p className="flex items-center gap-1 text-xs">
                          <User2 size={"12px"} /> <span>{pkg.pax}</span>
                        </p>
                      </ToggleGroupItem>
                    ))
                  : null,
              )}
            </ToggleGroup>
          </TabsContent>
          <TabsContent value="threeMainDishes">
            <ToggleGroup
              type="single"
              className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-3"
            >
              {cateringDetails.mainDishesPerPrice.map((mainDish) =>
                mainDish.numberOfDish === 3 // Filter for threeMainDishes
                  ? mainDish.packages.map((pkg, index) => (
                      <ToggleGroupItem
                        key={`${mainDish.numberOfDish}-${pkg.title}-${index}`}
                        value={`${mainDish.numberOfDish}-${pkg.title}`}
                        className="flex h-24 flex-col border border-secondary-600"
                      >
                        <p className="text-xl font-medium">₱ {pkg.price}</p>
                        <p className="flex items-center gap-1 text-xs">
                          <User2 size={"12px"} /> <span>{pkg.pax}</span>
                        </p>
                      </ToggleGroupItem>
                    ))
                  : null,
              )}
            </ToggleGroup>
          </TabsContent>
        </Tabs>
        <section>
          <Separator className="col-span-2 my-6" />
          <div className="flex gap-3">
            <div className="w-full">
              <h3 className="mb-3 text-xl font-semibold">Package</h3>
              <ul>
                {cateringDetails.packages.map((pkg, index) => (
                  <li key={index}>
                    <h3 className="font-semibold">{pkg.title}</h3>
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
            <Separator orientation="vertical" className="mx-3 h-auto" />
            <div className="w-full">
              <h3 className="mb-3 text-xl font-semibold">Inclusion </h3>
              <ul className="list-disc">
                {cateringDetails.inclusions.map((inclusion, index) => (
                  <li key={index} className="ml-4">
                    <p>{inclusion}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Card>
      <Card className="p-6">
        <div>
          <h3 className="text-xl font-bold">Selection of Dishes</h3>
          <p className="mb-3">(3 dishes left)</p>
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
                          key={index}
                          value={drink}
                          id={`drink-${index}`}
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
                          key={index}
                          value={dessert}
                          id={`dessert-${index}`}
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
                          key={index}
                          value={pasta}
                          id={`pasta-${index}`}
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
                    {snack.dishes.map((dish, index) => (
                      <div key={index} className="i flex space-x-2">
                        <Checkbox
                          key={index}
                          value={dish}
                          id={`${snack.category}-${index}`}
                        />
                        <label
                          htmlFor={`${snack.category}-${index}`}
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
