export interface Catering {
  id: string;
  expectedPax: number;
  totalAmount: number;
  numberOfMainDishes: number;
  eventId: string;
  packageId: string;
  mainDishPackage: string;
  mainDishes: MainDish[];
  snackCorner: SnackCorner[];
  addOns: AddOn[];
}

export interface CateringRequestData {
  expectedPax: number;
  totalAmount: number;
  numberOfMainDishes: number;
  eventId: string;
  packageId: string;
  mainDishes: string[];
  pickASnackCorner: string[];
  addOns: string[];
}

export interface CateringResponseData {
  id: string;
  expectedPax: number;
  totalAmount: number;
  numberOfMainDishes: number;
  mainDishPackage: MainDishPackage;
  eventId: string;
  packageId: string;
  mainDishes: MainDish[];
  pickASnackCorner: MainDish[];
  addOns: AddOn[];
}

export interface MainDish {
  id: string;
  name: string;
  dishType: string;
  category: string;
  description: string;
}

export interface SnackCorner {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface AddOn {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  paxCapacity: number;
  serviceHours: string;
}

export interface MainDishPackage {
  id: string;
  name: string;
  numOfDishesCategory: number;
  price: number;
  minPax: number;
  maxPax: number;
}

export interface Package {
  id: string;
  title: string;
  description: string;
}

export interface Inclusion {
  id: string;
  name: string;
  description: string;
}

export interface CateringContextType {
  isInternalCatering: boolean;
  setIsInternalCatering: (isInternalCatering: boolean) => void;
  expectedPax: number;
  setExpectedPax: (expectedPax: number) => void;
  totalAmount: number;
  setTotalAmount: (totalAmount: number) => void;
  maxDishes: number;
  setMaxDishes: (maxDishes: number) => void;
  selectedDishes: MainDish[];
  setSelectedDishes: (selectedDishes: MainDish[]) => void;
  numberOfMainDishes: number;
  setNumberOfMainDishes: (numberOfMainDishes: number) => void;
  selectedPackage: MainDishPackage | null;
  setSelectedPackage: (selectedPackage: MainDishPackage | null) => void;
  drinks: MainDish[];
  setDrinks: (drinks: MainDish[]) => void;
  desserts: MainDish[];
  setDesserts: (desserts: MainDish[]) => void;
  pastas: MainDish[];
  setPastas: (pastas: MainDish[]) => void;
  sandwiches: SnackCorner[];
  setSandwiches: (sandwiches: SnackCorner[]) => void;
  fruits: SnackCorner[];
  setFruits: (fruits: SnackCorner[]) => void;
  salad: SnackCorner[];
  setSalad: (salad: SnackCorner[]) => void;
  foodCarts: AddOn[];
  setFoodCarts: (foodCarts: AddOn[]) => void;
  technicals: AddOn[];
  setTechnicals: (technicals: AddOn[]) => void;
  mainDishPackages: MainDishPackage[];
  setMainDishPackages: (mainDishPackages: MainDishPackage[]) => void;
  packageDetails: Package[];
  setPackageDetails: (packageDetails: Package[]) => void;
  inclusions: Inclusion[];
  setInclusions: (inclusions: Inclusion[]) => void;
  mainDishes: MainDish[];
  setMainDishes: (mainDishes: MainDish[]) => void;
  snackCorners: SnackCorner[];
  setSnackCorners: (snackCorners: SnackCorner[]) => void;
  addOns: AddOn[];
  setAddOns: (addOns: AddOn[]) => void;
}
