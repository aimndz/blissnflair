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

export interface MainDish {
  id: string;
  name: string;
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

export interface Inclusion {
  id: string;
  name: string;
  description: string;
}
