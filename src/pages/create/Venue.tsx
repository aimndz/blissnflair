import { Button } from "../../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import spaceDetails from "./spaceDetails";
import SpaceDetailsSidebar from "./SpaceDetailsSidebar";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";
import { ArrowRightIcon } from "lucide-react";

interface Space {
  name: string;
  value: string;
  image: string;
  floorLevel: string;
  floorArea: string;
  capacity: string;
  icon: React.ReactNode;
  rates: {
    title: string;
    "mon-thurs": number;
    "fri-sun": number;
    additionalVAT: number;
    additionalPerHour: number;
    cleaningFee: number;
    corkageFee: number;
  } | null;
  packages: {
    packageRates: {
      title: string;
      Description: string;
      price: number;
    }[];
    additionalHead: number;
    additionalHour: number;
  } | null;
  inclusions: string[];
  note: string[];
  additionalNote: {
    title: string;
    description: string;
  }[];
}

function Venue() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const routePrefix = useRoutePrefix();

  const navigate = useNavigate();

  const handleEventInfo = () => {
    if (selectedSpace) {
      navigate(`/${routePrefix}/create/event-info`, {
        state: { spaceName: selectedSpace?.value },
      });
    }
  };

  return (
    <div
      className={`mx-auto flex max-w-7xl flex-col justify-center gap-5 md:h-[calc(100vh-10rem)] ${selectedSpace ? "min-[1000px]:flex-row" : ""} `}
    >
      <div className="flex w-full items-center">
        <div className="z-10 mx-auto w-full max-w-3xl flex-col items-center justify-center">
          <h2 className="mb-3 text-center text-2xl font-semibold">
            Select Your Ideal Space
          </h2>
          <ToggleGroup
            type="single"
            value={selectedSpace ? selectedSpace.name : ""}
            onValueChange={(value: string) => {
              if (value === "") {
                setSelectedSpace(null); // Handle deselection
              } else {
                const space = spaceDetails.find((s) => s.name === value);
                if (space) {
                  setSelectedSpace(space);
                }
              }
            }}
            className="mx-auto grid w-full grid-cols-1 justify-center gap-3 md:grid-cols-3"
          >
            {spaceDetails.map((space) => (
              <ToggleGroupItem
                key={space.name}
                value={space.name}
                disabled={space.name === "Private Room"}
                className={`} relative z-10 flex cursor-pointer flex-col rounded-lg border border-secondary-600 bg-secondary-100 px-5 py-20 text-center shadow-lg transition-all delay-75 hover:bg-secondary-300 ${
                  selectedSpace && selectedSpace.name === space.name
                    ? "bg-secondary-300"
                    : ""
                } `}
              >
                <div
                  className={`transition-all delay-75 ${
                    selectedSpace && selectedSpace.name === space.name
                      ? "text-secondary-100"
                      : "text-secondary-700"
                  }`}
                >
                  {space.icon}
                </div>
                <div
                  className={`transition-all delay-75 ${
                    selectedSpace && selectedSpace.name === space.name
                      ? "text-secondary-100"
                      : "text-secondary-700"
                  }`}
                >
                  <div className="mb-3 leading-3">
                    <h3 className="text-lg font-medium">{space.name}</h3>
                    <p>[{space.floorLevel}]</p>
                  </div>
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="flex">
            <Button
              type="button"
              className="z-10 ml-auto mt-5 w-full max-w-40 rounded-full bg-primary-100 font-bold text-secondary-900 shadow-lg hover:bg-primary-200"
              onClick={handleEventInfo}
              disabled={!selectedSpace}
            >
              Next
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <img
        src={selectedSpace?.image}
        alt="venue img"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-10 shadow-lg"
      />
      <div className="z-10 mx-auto w-full max-w-3xl">
        {selectedSpace && <SpaceDetailsSidebar selectedSpace={selectedSpace} />}
      </div>
    </div>
  );
}

export default Venue;
