import { User2 } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { useCatering } from "../../../../hooks/use-catering";
import { MainDishPackage } from "../../../../types/catering";

function PackageSelection() {
  const {
    mainDishPackages,
    expectedPax,
    numberOfMainDishes,
    selectedPackage,
    setMaxDishes,
    setSelectedDishes,
    setNumberOfMainDishes,
    setSelectedPackage,
    setTotalAmount,
    setExpectedPax,
  } = useCatering();

  const handleTabChange = (numberOfDishes: number) => {
    setMaxDishes(numberOfDishes);
    setSelectedDishes([]);
    setNumberOfMainDishes(numberOfDishes);
  };

  const handlePackageSelect = (pkg: MainDishPackage) => {
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

  return (
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
              const matchingPackage = mainDishPackages.find(
                (pkg) =>
                  pkg.numOfDishesCategory === numberOfMainDishes &&
                  pkg.minPax <= expectedPax &&
                  pkg.maxPax >= expectedPax,
              );

              return matchingPackage ? matchingPackage.id : undefined;
            })()}
          >
            {mainDishPackages.map((mainDishPackage) =>
              mainDishPackage.numOfDishesCategory === 3 ? (
                <ToggleGroupItem
                  key={`${mainDishPackage.id}`}
                  value={`${mainDishPackage.id}`}
                  onClick={() => handlePackageSelect(mainDishPackage)} // Capture the selected package object
                  disabled={
                    expectedPax !== 0 &&
                    !(
                      mainDishPackage.minPax <= expectedPax &&
                      mainDishPackage.maxPax >= expectedPax
                    )
                  }
                  className="flex h-24 flex-col border border-secondary-600"
                >
                  <p className="text-xl font-medium">
                    ₱ {mainDishPackage.price} / pax
                  </p>
                  <p className="flex items-center gap-1 text-xs">
                    <User2 size={"12px"} />{" "}
                    <span>
                      {`${mainDishPackage.minPax} - ${mainDishPackage.maxPax} pax`}
                    </span>
                  </p>
                </ToggleGroupItem>
              ) : null,
            )}
          </ToggleGroup>
        </TabsContent>
        <TabsContent value="twoMainDishes">
          <ToggleGroup
            type="single"
            className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-3"
            value={(() => {
              const matchingPackage = mainDishPackages.find(
                (pkg) =>
                  pkg.numOfDishesCategory === numberOfMainDishes &&
                  pkg.minPax <= expectedPax &&
                  pkg.maxPax >= expectedPax,
              );

              return matchingPackage ? matchingPackage.id : undefined;
            })()}
          >
            {mainDishPackages.map((mainDishPackage) =>
              mainDishPackage.numOfDishesCategory === 2 ? (
                <ToggleGroupItem
                  key={`${mainDishPackage.id}`}
                  value={`${mainDishPackage.id}`}
                  onClick={() => handlePackageSelect(mainDishPackage)} // Capture the selected package object
                  disabled={
                    expectedPax !== 0 &&
                    !(
                      mainDishPackage.minPax <= expectedPax &&
                      mainDishPackage.maxPax >= expectedPax
                    )
                  }
                  className="flex h-24 flex-col border border-secondary-600"
                >
                  <p className="text-xl font-medium">
                    ₱ {mainDishPackage.price} / pax
                  </p>
                  <p className="flex items-center gap-1 text-xs">
                    <User2 size={"12px"} />{" "}
                    <span>
                      {`${mainDishPackage.minPax} - ${mainDishPackage.maxPax} pax`}
                    </span>
                  </p>
                </ToggleGroupItem>
              ) : null,
            )}
          </ToggleGroup>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default PackageSelection;
