import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import InHouseCatering from "./InHouseCatering";
import ExternalCatering from "./ExternalCatering";
import { useLocation, useNavigate } from "react-router-dom";

function Catering() {
  const location = useLocation();
  const navigate = useNavigate();

  const { event } = location.state || {};

  console.log(event);

  const handleGoBack = () => {
    navigate("/dashboard/create/event-info", { state: { event } });
  };

  const handlePreviewButton = () => {
    if (event) {
      navigate("/dashboard/create/preview", { state: { event } });
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Button
        className="bg-transparent px-0 text-secondary-900 shadow-none hover:bg-transparent hover:text-secondary-800"
        onClick={handleGoBack}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <div className="text-center">
        <p className="font-semibold">
          Do you like to avail our in-house catering package?
        </p>
      </div>
      <div>
        <Tabs className="mt-12 w-full" defaultValue="internalCatering">
          <div className="flex justify-center">
            <TabsList className="flex w-full max-w-2xl space-x-4 bg-transparent p-0">
              <TabsTrigger
                value="internalCatering"
                className="h-24 w-full rounded border border-secondary-600 bg-secondary-300 px-4 py-2 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
              >
                Yes, I’d like to avail
              </TabsTrigger>
              <TabsTrigger
                value="externalCatering"
                className="flex h-24 w-full flex-col rounded border border-secondary-600 bg-secondary-300 px-4 py-2 text-secondary-900 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
              >
                <p>No, I prefer external catering</p>
                <p className="text-secondary-800">(with corkage fee)</p>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Internal Catering */}
          <TabsContent value="internalCatering">
            <InHouseCatering />
          </TabsContent>

          {/* External Catering */}
          <TabsContent value="externalCatering">
            <ExternalCatering />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button
            type="button"
            className="mt-5 w-full max-w-20 rounded-full bg-primary-100 px-20 font-semibold text-secondary-900 hover:bg-primary-200"
            onClick={handlePreviewButton}
          >
            Preview <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Catering;
