import { User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useCatering } from "../../../../hooks/use-catering";
import { AddOn } from "../../../../types/catering";
import { Checkbox } from "../../../../components/ui/checkbox";

function FoodCartSelection({
  groupedAddOns,
}: {
  groupedAddOns: { [key: string]: AddOn[] };
}) {
  const { foodCarts, totalAmount, setFoodCarts, setTotalAmount } =
    useCatering();

  const foodCartItems = groupedAddOns["Food Cart"] || [];
  const groupedFoodCartByPrice = foodCartItems.reduce(
    (acc, item) => {
      const priceKey = item.price; // Use price as the key
      if (!acc[priceKey]) {
        acc[priceKey] = []; // Initialize an array for this price if it doesn't exist
      }
      acc[priceKey].push(item); // Add the item to the corresponding price group
      return acc;
    },
    {} as { [key: number]: AddOn[] },
  );

  const handleFoodCartSelection = (selectedCart: AddOn) => {
    const isSelected = foodCarts.some((cart) => cart.id === selectedCart.id);

    if (!isSelected) {
      setFoodCarts([...foodCarts, selectedCart]);
      setTotalAmount(totalAmount + selectedCart.price);
    } else {
      setFoodCarts(foodCarts.filter((cart) => cart.id !== selectedCart.id));
      setTotalAmount(totalAmount - selectedCart.price);
    }
  };

  return (
    <>
      <h3 className="mb-3 font-bold">Food Carts</h3>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(groupedFoodCartByPrice).map(([price, carts]) => (
          <Card key={price} className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">
                <p>₱{price} / cart</p>
                {carts.length > 0 && (
                  <>
                    <p className="text-sm">{carts[0].description}</p>
                    <p className="-mt-1 flex items-center gap-1 text-sm font-normal">
                      <User2 size={"13px"} /> <p>{carts[0].paxCapacity} pax</p>
                    </p>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {carts.map((cart) => (
                <div key={cart.id}>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={cart.id}
                      value={cart.id}
                      checked={foodCarts.some(
                        (foodCart) => foodCart.id === cart.id,
                      )}
                      onClick={() => handleFoodCartSelection(cart)}
                    />
                    <label htmlFor={cart.id} className="text-sm">
                      {cart.name}
                    </label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default FoodCartSelection;
