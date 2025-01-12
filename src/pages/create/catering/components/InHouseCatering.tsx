import { Separator } from "../../../../components/ui/separator";
import { Card } from "../../../../components/ui/card";
import { useEffect } from "react";
import {
  getAllAddOns,
  getAllInclusions,
  getAllMainDishes,
  getAllMainDishPackage,
  getAllPackages,
  getAllSnackCorners,
} from "../../../../services/cateringDetailsApi";
import { AddOn } from "../../../../types/catering";
import { useCatering } from "../../../../hooks/use-catering";
import AdditionalDetails from "./AdditionalDetails";
import PackageSelection from "./PackageSelection";
import MainDishSelection from "./MainDishSelection";
import OtherDishSelection from "./OtherDishSelection";
import SnackCornerSelection from "./SnackCornerSelection";
import FoodCartSelection from "./FoodCartSelection";
import TechnicalSelection from "./TechnicalSelection";
import PaxAndTotalCard from "./PaxAndTotalCard";

function InHouseCatering() {
  const {
    expectedPax,
    setTotalAmount,
    numberOfMainDishes,
    setSelectedPackage,
    foodCarts,
    technicals,
    mainDishPackages,
    setMainDishPackages,
    setPackageDetails,
    setInclusions,
    setMainDishes,
    setSnackCorners,
    addOns,
    setAddOns,
  } = useCatering();

  useEffect(() => {
    const fetchData = async () => {
      const mainDishPackage = await getAllMainDishPackage();
      const packages = await getAllPackages();
      const inclusions = await getAllInclusions();
      const mainDishes = await getAllMainDishes();
      const snackCorner = await getAllSnackCorners();
      const addOns = await getAllAddOns();

      setMainDishPackages(mainDishPackage.data);
      setPackageDetails(packages.data);
      setInclusions(inclusions.data);
      setMainDishes(mainDishes.data);
      setSnackCorners(snackCorner.data);
      setAddOns(addOns.data);
    };
    fetchData();
  }, [
    setMainDishPackages,
    setPackageDetails,
    setInclusions,
    setMainDishes,
    setSnackCorners,
    setAddOns,
  ]);

  useEffect(() => {
    // Calculate the cost for food carts and technicals
    const foodCartCost = foodCarts.reduce((sum, cart) => sum + cart.price, 0);
    const technicalCost = technicals.reduce((sum, tech) => sum + tech.price, 0);

    // Find the matching package
    const matchingPackage = mainDishPackages.find(
      (pkg) =>
        pkg.numOfDishesCategory === numberOfMainDishes &&
        pkg.minPax <= expectedPax &&
        pkg.maxPax >= expectedPax,
    );

    let packageCost = 0;
    if (matchingPackage) {
      packageCost = matchingPackage.price * expectedPax;
      setSelectedPackage(matchingPackage);
    }

    // Calculate the totalAmount based on foodCartCost, technicalCost, and packageCost
    setTotalAmount(foodCartCost + technicalCost + packageCost);
  }, [
    foodCarts,
    technicals,
    expectedPax,
    numberOfMainDishes,
    mainDishPackages,
    setSelectedPackage,
    setTotalAmount,
  ]);

  const groupedAddOns = addOns.reduce(
    (acc: { [key: string]: AddOn[] }, addOn) => {
      if (!acc[addOn.category]) {
        acc[addOn.category] = [];
      }
      acc[addOn.category].push(addOn);
      return acc;
    },
    {} as { [key: string]: AddOn[] },
  );

  return (
    <div className="space-y-3">
      <PaxAndTotalCard />
      <section className="flex flex-col gap-3 md:flex-row">
        <PackageSelection />
        <AdditionalDetails />
      </section>
      <section>
        <Card className="p-6">
          <MainDishSelection />
          <Separator className="my-6" />
          <OtherDishSelection />
        </Card>
      </section>
      <SnackCornerSelection />
      <Card className="p-6">
        <h2 className="text-xl font-bold">Add ons </h2>
        <FoodCartSelection groupedAddOns={groupedAddOns} />
        <Separator className="my-6" />
        <TechnicalSelection groupedAddOns={groupedAddOns} />
      </Card>
    </div>
  );
}

export default InHouseCatering;
