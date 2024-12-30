import { ArrowLeft, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import InHouseCatering from "./components/InHouseCatering";
import ExternalCatering from "./components/ExternalCatering";
import { useLocation, useNavigate } from "react-router-dom";
import { useRoutePrefix } from "../../../hooks/useRoutePrefix";
import { Card } from "../../../components/ui/card";
import { useEffect } from "react";
import { useCatering } from "../../../hooks/use-catering";
import { toast } from "sonner";
import SummaryCard from "./components/SummaryCard";

function Catering() {
  const location = useLocation();
  const navigate = useNavigate();
  const routePrefix = useRoutePrefix();
  const { event, catering: cateringDetails } = location.state || {};

  const {
    isInternalCatering,
    expectedPax,
    totalAmount,
    selectedDishes,
    numberOfMainDishes,
    drinks,
    desserts,
    pastas,
    selectedPackage,
    sandwiches,
    fruits,
    salad,
    foodCarts,
    technicals,
    setIsInternalCatering,
    setExpectedPax,
    setSelectedPackage,
    setSelectedDishes,
    setDrinks,
    setDesserts,
    setPastas,
    setSandwiches,
    setFruits,
    setSalad,
    setFoodCarts,
    setTechnicals,
  } = useCatering();

  const catering = {
    isInternalCatering,
    expectedPax,
    totalAmount,
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
  };

  const handleGoBack = () => {
    navigate(`/${routePrefix}/create/event-info`, { state: { event } });
  };

  const handlePreviewButton = () => {
    if (event) {
      if (isInternalCatering) {
        navigate(`/${routePrefix}/create/preview`, {
          state: { event, catering },
        });
      } else {
        navigate(`/${routePrefix}/create/preview`, {
          state: { event },
        });
      }
    } else {
      toast.error("Please fill out the event details first.");
    }
  };

  const handleTabChange = (value: string) => {
    setIsInternalCatering(value === "internalCatering");
  };

  useEffect(() => {
    if (cateringDetails) {
      setExpectedPax(cateringDetails.expectedPax);
      setSelectedPackage(cateringDetails.packageId);
      setSelectedDishes(cateringDetails.selectedDishes);
      setDrinks(cateringDetails.drinks);
      setDesserts(cateringDetails.desserts);
      setPastas(cateringDetails.pastas);
      setSandwiches(cateringDetails.sandwiches);
      setFruits(cateringDetails.fruits);
      setSalad(cateringDetails.salad);
      setFoodCarts(cateringDetails.foodCarts);
      setTechnicals(cateringDetails.technicals);
    }
  }, [
    cateringDetails,
    setExpectedPax,
    setSelectedPackage,
    setSelectedDishes,
    setDrinks,
    setDesserts,
    setPastas,
    setSandwiches,
    setFruits,
    setSalad,
    setFoodCarts,
    setTechnicals,
  ]);

  return (
    <div className="mx-auto mb-20 max-w-7xl">
      <Button
        className="bg-transparent px-0 text-secondary-900 shadow-none hover:bg-transparent hover:text-secondary-800"
        onClick={handleGoBack}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <div className="w-full">
        <div className="flex items-start gap-3">
          <Tabs
            className="w-2/3"
            defaultValue={
              isInternalCatering ? "internalCatering" : "externalCatering"
            }
            onValueChange={handleTabChange}
          >
            {/* Triggers Card */}
            <Card className="mb-3">
              <div className="flex h-60 flex-col justify-center p-6">
                <div className="text-center">
                  <p className="text-xl font-semibold">
                    Do you like to avail our in-house catering package?
                  </p>
                </div>
                <div className="mt-4 flex justify-center">
                  <TabsList className="flex h-24 w-full max-w-2xl space-x-4 bg-transparent p-0">
                    <TabsTrigger
                      value="internalCatering"
                      className="h-24 w-full flex-col rounded-lg border border-secondary-600 px-4 py-2 font-semibold data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
                    >
                      <ThumbsUp className="mb-1" />
                      <p>Yes, I’d like to avail</p>
                      <p className="font-normal">
                        (hassle-free and fully catered)
                      </p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="externalCatering"
                      className="flex h-24 w-full flex-col rounded-lg border border-secondary-600 bg-secondary-200 px-4 py-2 font-semibold text-secondary-900 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
                    >
                      <ThumbsDown className="mb-1" />
                      <p>No, I prefer external catering</p>
                      <p className="font-normal">(with corkage fee)</p>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
            </Card>
            {/* Content Card */}
            <TabsContent value="internalCatering">
              <InHouseCatering />
            </TabsContent>
            <TabsContent value="externalCatering">
              <ExternalCatering />
            </TabsContent>
          </Tabs>
          <SummaryCard handlePreviewButton={handlePreviewButton} />
        </div>
      </div>
    </div>
  );
}

export default Catering;
