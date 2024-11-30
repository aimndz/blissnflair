import { CubeIcon, PersonIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../../components/ui/scroll-area";

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
    <div className="w-2/5 rounded-lg border border-secondary-600 bg-secondary-100 py-3 pl-3">
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
        {selectedSpace.rates && (
          <div className="rounded-lg">
            <h3 className="font-bold">Rates</h3>
            <p className="mb-3">{selectedSpace.rates?.title}:</p>
            <div className="space-y-5">
              {selectedSpace.rates["mon-thurs"] > 0 && (
                <div>
                  <p>
                    Mon-Thurs:{" "}
                    <span className="font-semibold">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(selectedSpace.rates["mon-thurs"])}
                    </span>
                  </p>
                  {selectedSpace.rates.additionalVAT > 0 && (
                    <p>
                      Additional VAT{" "}
                      <span>{selectedSpace.rates.additionalVAT * 100}%</span>:{" "}
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(
                          selectedSpace.rates["mon-thurs"] *
                            selectedSpace.rates.additionalVAT,
                        )}
                      </span>
                    </p>
                  )}
                  <p>
                    Total:{" "}
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
                </div>
              )}
              {selectedSpace.rates["fri-sun"] > 0 && (
                <div>
                  <p>
                    Fri-Sun:{" "}
                    <span className="font-semibold">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(selectedSpace.rates["fri-sun"])}
                    </span>
                  </p>
                  {selectedSpace.rates.additionalVAT > 0 && (
                    <p>
                      Additional VAT{" "}
                      <span>{selectedSpace.rates.additionalVAT * 100}%</span>:{" "}
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(
                          selectedSpace.rates["fri-sun"] *
                            selectedSpace.rates.additionalVAT,
                        )}
                      </span>
                    </p>
                  )}
                  <p>
                    Total:{" "}
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
                </div>
              )}
              {selectedSpace.rates.additionalPerHour > 0 && (
                <div>
                  <p>
                    Additional Per Hour:{" "}
                    <span className="font-semibold">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(selectedSpace.rates.additionalPerHour)}
                    </span>
                  </p>
                </div>
              )}
              {selectedSpace.rates.cleaningFee > 0 && (
                <div>
                  <p>
                    Cleaning Fee:{" "}
                    <span className="font-semibold">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(selectedSpace.rates.cleaningFee)}
                    </span>
                  </p>
                </div>
              )}
              {selectedSpace.rates.corkageFee > 0 && (
                <div>
                  <p>
                    Corkage Fee:{" "}
                    <span className="font-semibold">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(selectedSpace.rates.corkageFee)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {selectedSpace.packages && (
          <div>
            <h3 className="font-bold">Package Rates</h3>
            <div className="space-y-3">
              {selectedSpace.packages.packageRates.map((packageRate, index) =>
                packageRate.price > 0 ? (
                  <div key={index}>
                    <p>{packageRate.title}</p>
                    <p>{packageRate.Description}</p>
                    <p className="font-semibold">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(packageRate.price)}
                    </p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        )}
        <div className="mt-5">
          <h3 className="font-bold">Inclusions</h3>
          <ul className="ml-4 list-disc">
            {/* List the inclusions */}
            {selectedSpace.inclusions.map((item, index) => (
              <li key={index}>{item}</li>
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
