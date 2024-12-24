import { ArrowLeft, ArrowRight, ThumbsDown, ThumbsUp } from "lucide-react";
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
import { useRoutePrefix } from "../../hooks/useRoutePrefix";
import { Card } from "../../components/ui/card";

function Catering() {
  const location = useLocation();
  const navigate = useNavigate();
  const routePrefix = useRoutePrefix();

  const { event } = location.state || {};

  const handleGoBack = () => {
    navigate(`/${routePrefix}/create/event-info`, { state: { event } });
  };

  const handlePreviewButton = () => {
    if (event) {
      navigate(`/${routePrefix}/create/preview`, { state: { event } });
    }
  };

  return (
    <div className="mx-auto mb-20 max-w-4xl">
      <Button
        className="bg-transparent px-0 text-secondary-900 shadow-none hover:bg-transparent hover:text-secondary-800"
        onClick={handleGoBack}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <div className="mx-auto max-w-4xl">
        <div>
          <Tabs className="w-full" defaultValue="internalCatering">
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
                      className="bg-secondary-2 00 flex h-24 w-full flex-col rounded-lg border border-secondary-600 px-4 py-2 font-semibold text-secondary-900 data-[state=active]:bg-primary-100 data-[state=active]:text-secondary-900"
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
    </div>
  );
}

export default Catering;
