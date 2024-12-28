import { useState } from "react";
import { createContext } from "react";
import {
  AddOn,
  CateringContextType,
  Inclusion,
  MainDish,
  MainDishPackage,
  Package,
  SnackCorner,
} from "../types/catering";

const CateringContext = createContext<CateringContextType | undefined>(
  undefined,
);

function CateringProvider({ children }: { children: React.ReactNode }) {
  const [expectedPax, setExpectedPax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [maxDishes, setMaxDishes] = useState(3);
  const [selectedDishes, setSelectedDishes] = useState<MainDish[]>([]);
  const [numberOfMainDishes, setNumberOfMainDishes] = useState(3);
  const [selectedPackage, setSelectedPackage] =
    useState<MainDishPackage | null>(null);
  const [drinks, setDrinks] = useState<MainDish[]>([]);
  const [desserts, setDesserts] = useState<MainDish[]>([]);
  const [pastas, setPastas] = useState<MainDish[]>([]);
  const [sandwiches, setSandwiches] = useState<SnackCorner[]>([]);
  const [fruits, setFruits] = useState<SnackCorner[]>([]);
  const [salad, setSalad] = useState<SnackCorner[]>([]);
  const [foodCarts, setFoodCarts] = useState<AddOn[]>([]);
  const [technicals, setTechnicals] = useState<AddOn[]>([]);
  const [mainDishPackages, setMainDishPackages] = useState<MainDishPackage[]>(
    [],
  );
  const [packageDetails, setPackageDetails] = useState<Package[]>([]);
  const [inclusions, setInclusions] = useState<Inclusion[]>([]);
  const [mainDishes, setMainDishes] = useState<MainDish[]>([]);
  const [snackCorners, setSnackCorners] = useState<SnackCorner[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);

  return (
    <CateringContext.Provider
      value={{
        expectedPax,
        setExpectedPax,
        totalAmount,
        setTotalAmount,
        maxDishes,
        setMaxDishes,
        selectedDishes,
        setSelectedDishes,
        numberOfMainDishes,
        setNumberOfMainDishes,
        selectedPackage,
        setSelectedPackage,
        drinks,
        setDrinks,
        desserts,
        setDesserts,
        pastas,
        setPastas,
        sandwiches,
        setSandwiches,
        fruits,
        setFruits,
        salad,
        setSalad,
        foodCarts,
        setFoodCarts,
        technicals,
        setTechnicals,
        mainDishPackages,
        setMainDishPackages,
        packageDetails,
        setPackageDetails,
        inclusions,
        setInclusions,
        mainDishes,
        setMainDishes,
        snackCorners,
        setSnackCorners,
        addOns,
        setAddOns,
      }}
    >
      {children}
    </CateringContext.Provider>
  );
}

export { CateringProvider, CateringContext };
