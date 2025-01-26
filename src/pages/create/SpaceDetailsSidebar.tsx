import { CubeIcon, PersonIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { Check } from "lucide-react";

interface Space {
  name: string;
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

function SpaceDetailsSidebar({ selectedSpace }: { selectedSpace: Space }) {
  return (
    <div className="mt-3 rounded-lg border border-secondary-600 bg-secondary-100 py-3 pl-3">
      <ScrollArea className="h-[calc(100vh-10rem)] pr-3">
        {" "}
        <div className="aspect-[4/3] w-full">
          <img
            src={selectedSpace.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="my-3 leading-3">
          <h1 className="text-2xl font-bold">{selectedSpace.name}</h1>
          <p className="font-semibold">[{selectedSpace.floorLevel}]</p>
        </div>
        <div className="mb-3 text-sm">
          <div className="flex items-center gap-1">
            <CubeIcon />
            <p>
              Floor Area: <span>{selectedSpace.floorArea}</span> sqm
            </p>
          </div>
          <div className="flex items-center gap-1">
            <PersonIcon />
            <p>
              Capacity: <span>{selectedSpace.capacity}</span>{" "}
              {selectedSpace.name === "Private Room" ? "Adults" : "pax"}
            </p>
          </div>
        </div>
        <Separator className="my-3" />
        {selectedSpace.rates && (
          <div className="rounded-lg">
            <h3 className="font-bold">Rates</h3>
            <div className="space-y-5">
              <div className="flex justify-center gap-3">
                {selectedSpace.rates["mon-thurs"] > 0 && (
                  <div className="w-full rounded-lg border border-secondary-600 p-3 text-center">
                    <p className="text-center text-xs font-medium">Mon-Thurs</p>
                    <p className="text-xl">
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(
                          selectedSpace.rates["mon-thurs"] +
                            selectedSpace.rates["mon-thurs"] *
                              selectedSpace.rates.additionalVAT,
                        )}
                      </span>
                    </p>
                    <p className="text-xs text-secondary-800">
                      {selectedSpace.rates?.title}
                    </p>
                  </div>
                )}
                {selectedSpace.rates["fri-sun"] > 0 && (
                  <div className="w-full rounded-lg border border-secondary-600 p-3 text-center">
                    <p className="text-center text-xs font-medium">Fri-Sun</p>
                    <p className="text-xl">
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(
                          selectedSpace.rates["fri-sun"] +
                            selectedSpace.rates["fri-sun"] *
                              selectedSpace.rates.additionalVAT,
                        )}
                      </span>
                    </p>

                    <p className="text-xs text-secondary-800">
                      {selectedSpace.rates?.title}
                    </p>
                  </div>
                )}
              </div>
              {(selectedSpace.rates.additionalPerHour > 0 ||
                selectedSpace.rates.cleaningFee > 0 ||
                selectedSpace.rates.corkageFee > 0) && (
                <h3 className="font-bold">Additional</h3>
              )}

              <div className="flex justify-center gap-3">
                {selectedSpace.rates.additionalPerHour > 0 && (
                  <div className="rounded-lg border border-secondary-600 p-3 text-center">
                    <p className="text-xl">
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(selectedSpace.rates.additionalPerHour)}
                      </span>
                    </p>
                    <p className="text-center text-xs font-medium">
                      Additional Per Hour
                    </p>
                  </div>
                )}
                {selectedSpace.rates.cleaningFee > 0 && (
                  <div className="rounded-lg border border-secondary-600 p-3 text-center">
                    <p className="text-xl">
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(selectedSpace.rates.cleaningFee)}
                      </span>
                    </p>
                    <p className="text-center text-xs font-medium">
                      Cleaning Fee
                    </p>
                  </div>
                )}
                {selectedSpace.rates.corkageFee > 0 && (
                  <div className="rounded-lg border border-secondary-600 p-3 text-center">
                    <p className="text-xl">
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(selectedSpace.rates.corkageFee)}
                      </span>
                    </p>
                    <p className="text-center text-xs font-medium">
                      Corkage Fee
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedSpace.packages && (
          <div>
            <h3 className="font-bold">Package Rates</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedSpace.packages.packageRates.map((packageRate, index) =>
                packageRate.price > 0 ? (
                  <div
                    key={index}
                    className="rounded-lg border border-secondary-600 p-3 text-center"
                  >
                    <p className="text-xs font-medium">{packageRate.title}</p>
                    <p className="text-xl font-semibold">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(packageRate.price)}
                    </p>
                    <p className="text-xs text-secondary-800">
                      {packageRate.Description}
                    </p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        )}
        <div className="mt-5">
          <h3 className="font-bold">Inclusions</h3>
          <ul className="ml-4">
            {/* List the inclusions */}
            {selectedSpace.inclusions.map((item, index) => (
              <li key={index} className="flex gap-3">
                <Check size={15} /> {item}
              </li>
            ))}
          </ul>
          <div>
            {selectedSpace.additionalNote.map((note, index) => (
              <div key={index}>
                <p>
                  <span className="font-semibold">{note.title}</span>:{" "}
                  {note.description}
                </p>
              </div>
            ))}
          </div>
          {selectedSpace.note.length > 0 && (
            <div className="mt-3">
              <p className="font-bold">Note:</p>
              <ul className="ml-4 list-disc">
                <li>{selectedSpace.note}</li>
              </ul>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default SpaceDetailsSidebar;
