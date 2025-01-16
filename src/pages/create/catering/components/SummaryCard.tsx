import { ArrowRight, Utensils } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useCatering } from "../../../../hooks/use-catering";
import { formatCurrency } from "../../../../utils/formatCurrency";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

function SummaryCard() {
  const {
    expectedPax,
    numberOfMainDishes,
    selectedPackage,
    selectedDishes,
    drinks,
    desserts,
    pastas,
    sandwiches,
    fruits,
    salad,
    foodCarts,
    technicals,
    totalAmount,
  } = useCatering();

  return (
    <Accordion
      type="single"
      collapsible
      className="sticky top-10 z-50 mt-8 w-full self-auto rounded-lg border border-secondary-600 bg-secondary-100 shadow-lg min-[1000px]:mt-0 min-[1000px]:w-1/3"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-5 py-3">
          <h3 className="flex w-full items-center gap-3 text-lg font-bold">
            <span>Summary</span>
          </h3>
        </AccordionTrigger>
        <AccordionContent className="p-5">
          <div className="w-full self-auto">
            <div>
              {expectedPax > 0 && (
                <div className="flex justify-between">
                  <p className="font-semibold">Expected pax</p>
                  <p>{expectedPax} pax</p>
                </div>
              )}

              {numberOfMainDishes > 0 && (
                <div className="flex justify-between">
                  <p className="font-semibold">No. of main dishes</p>
                  <p>{numberOfMainDishes > 0 ? numberOfMainDishes : "N/A"}</p>
                </div>
              )}

              {selectedPackage && selectedPackage.price > 0 && (
                <div className="flex justify-between">
                  <p className="font-semibold">Package</p>
                  {selectedPackage && (
                    <p>PHP {formatCurrency(selectedPackage?.price)} / pax</p>
                  )}
                </div>
              )}

              {selectedDishes.filter((dish) => dish.dishType === "MAIN")
                .length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold">Main Dishes</p>
                  <div className="ml-3">
                    {selectedDishes
                      .filter((dish) => dish.dishType === "MAIN")
                      .map((dish) => (
                        <p key={dish.id}>{dish.name}</p>
                      ))}
                  </div>
                </div>
              )}

              {(drinks.length > 0 ||
                desserts.length > 0 ||
                pastas.length > 0) && (
                <div>
                  <p className="font-semibold">Others</p>
                  <div className="ml-3">
                    {drinks.map((dish) => (
                      <p key={dish.id}>{dish.name}</p>
                    ))}
                    {desserts.map((dish) => (
                      <p key={dish.id}>{dish.name}</p>
                    ))}
                    {pastas.map((dish) => (
                      <p key={dish.id}>{dish.name}</p>
                    ))}
                  </div>
                </div>
              )}

              {(sandwiches.length > 0 ||
                fruits.length > 0 ||
                salad.length > 0) && (
                <div>
                  <p className="font-semibold">Snack Corner</p>
                  <div className="ml-3">
                    {sandwiches.map((dish) => (
                      <p key={dish.id}>{dish.name}</p>
                    ))}
                    {fruits.map((dish) => (
                      <p key={dish.id}>{dish.name}</p>
                    ))}
                    {salad.map((dish) => (
                      <p key={dish.id}>{dish.name}</p>
                    ))}
                  </div>
                </div>
              )}

              {foodCarts.length > 0 && (
                <div>
                  <p className="font-semibold">Food Cart</p>
                  <div className="ml-3">
                    {foodCarts.map((dish) => (
                      <div className="flex justify-between" key={dish.id}>
                        <p>{dish.name}</p>
                        <p>PHP {formatCurrency(dish.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {technicals.length > 0 && (
                <div>
                  <p className="font-semibold">Technicals</p>
                  <div className="ml-3">
                    {technicals.map((dish) => (
                      <div className="flex justify-between" key={dish.id}>
                        <p>{dish.name}</p>
                        <p>PHP {formatCurrency(dish.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Separator className="my-3" />
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Expected pax * Package Price</p>
                  <p>
                    PHP{" "}
                    {formatCurrency(
                      expectedPax * (selectedPackage?.price || 0),
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Food carts</p>
                  <p>
                    PHP{" "}
                    {formatCurrency(
                      foodCarts.reduce((total, cart) => total + cart.price, 0),
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Technicals</p>
                  <p>
                    PHP{" "}
                    {formatCurrency(
                      technicals.reduce((total, cart) => total + cart.price, 0),
                    )}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="text-end text-xl font-semibold">
                    PHP {formatCurrency(totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SummaryCard;
