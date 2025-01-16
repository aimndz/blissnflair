import { useEffect } from "react";
import { useCatering } from "../../hooks/use-catering";
import {
  getAllAddOns,
  getAllInclusions,
  getAllMainDishes,
  getAllMainDishPackage,
  getAllPackages,
  getAllSnackCorners,
} from "../../services/cateringDetailsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";
import EventDialogApproval from "../../components/EventDialogApproval";
import { MainDishPackage } from "../../types/catering";

function SystemSettings() {
  const {
    mainDishPackages,
    packageDetails,
    setMainDishPackages,
    setPackageDetails,
    setInclusions,
    setMainDishes,
    setSnackCorners,
    setAddOns,
  } = useCatering();

  useEffect(() => {
    const fetchData = async () => {
      const mainDishPackage = await getAllMainDishPackage();
      const packages = await getAllPackages();
      const inclusions = await getAllInclusions();
      const mainDishes = await getAllMainDishes();
      const snackCorner = await getAllSnackCorners();
      const addOns = await getAllAddOns();

      setMainDishPackages(mainDishPackage.data);
      setPackageDetails(packages.data);
      setInclusions(inclusions.data);
      setMainDishes(mainDishes.data);
      setSnackCorners(snackCorner.data);
      setAddOns(addOns.data);
    };
    fetchData();
  }, [
    setMainDishPackages,
    setPackageDetails,
    setInclusions,
    setMainDishes,
    setSnackCorners,
    setAddOns,
  ]);

  console.log(packageDetails);

  const handleEditPackage = (mainDishPackage: MainDishPackage) => {
    console.log(mainDishPackage);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold">Catering Settings</h1>
      <h2 className="text-xl font-semibold">Packages</h2>
      <Table className="border border-secondary-600">
        <TableHeader className="bg-secondary-300 font-semibold">
          <TableRow>
            <TableHead>Package name</TableHead>
            <TableHead>Min Pax</TableHead>
            <TableHead>Max Pax</TableHead>
            <TableHead>No. of Dish</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-secondary-100">
          {mainDishPackages.map((mainDishPackage) => (
            <TableRow key={mainDishPackage.id}>
              <TableCell>{mainDishPackage.name}</TableCell>
              <TableCell>{mainDishPackage.minPax}</TableCell>
              <TableCell>{mainDishPackage.maxPax}</TableCell>
              <TableCell>{mainDishPackage.numOfDishesCategory}</TableCell>
              <TableCell>Php {mainDishPackage.price}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis className="w-5 cursor-pointer text-secondary-800" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditPackage(mainDishPackage)}
                      >
                        <Edit className="mr-2 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex w-full items-center px-2 py-1 text-sm text-red-600 hover:bg-secondary-200/50">
                              <Trash className="mr-2 w-4" />
                              Delete
                            </button>
                          </DialogTrigger>
                          {/* <EventDialogApproval
                            status="DELETED"
                            event={mainDishPackage}
                            onUpdateEvent={async () =>
                              await handleUpdateEvent(event.id, {
                                ...event,
                                deletedAt: new Date().toISOString(),
                              })
                            }
                          /> */}
                        </Dialog>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SystemSettings;
