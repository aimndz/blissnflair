import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { deleteAccount, getAllAccounts } from "../../services/accountApi"; // API function
import { Account, AccountProfile } from "../../types/account"; // Type definition
import { Input } from "../../components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { CalendarX, Edit, Ellipsis, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import AccountCreate from "./AccountCreate";
import AccountEdit from "./AccountEdit";
import { useUser } from "../../hooks/use-user";
import Loading from "../../components/LoadingSpinner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

function Accounts() {
  const user = useUser();

  const loggedInUserId = user.user?.id;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editUserData, setEditUserData] = useState<Account | null>(null);

  const handleAddUser = (newUser: AccountProfile) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleEditUser = (updatedUser: AccountProfile) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllAccounts();
        setUsers(users.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.id.toString().toLowerCase().includes(searchTerm) ||
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phoneNumber?.toLowerCase().includes(searchTerm)
    );
  });

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      deleteAccount(selectedUserId);
      setUsers(users.filter((user) => user.id !== selectedUserId));
      setOpenDeleteDialog(false);
    }
  };

  const handleEditClick = (user: Account) => {
    setEditUserData(user);
    setOpenEditDialog(true);
  };

  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto">
      <div className="mb-3 flex items-end justify-between">
        <Button
          className="bg-primary-100 text-secondary-900 hover:bg-primary-200"
          onClick={handleCreateClick}
        >
          <Plus /> Add account
        </Button>
        <div className="relative w-full max-w-96">
          <Input
            type="search"
            placeholder="Search by id, name, email, or phone..."
            className="w-full pr-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <Table className="rounded-lg border border-secondary-600 bg-secondary-100">
          <TableCaption>A list of all the users.</TableCaption>
          <TableHeader className="bg-secondary-300 font-semibold">
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone No.</TableHead>
              <TableHead>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="cursor-pointer transition-all delay-75 hover:underline">
                  {user.id}
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt="@shadcn"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xs uppercase">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  {user.email}
                </TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis className="w-5 cursor-pointer text-secondary-800" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(user)}>
                          <Edit className="mr-2 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={`${
                            user.id === loggedInUserId
                              ? "cursor-not-allowed opacity-50"
                              : "text-red-600"
                          }`}
                          disabled={user.id === loggedInUserId}
                          onClick={() =>
                            user.id !== loggedInUserId &&
                            handleDeleteClick(user.id)
                          }
                        >
                          <Trash className="mr-2 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="-mt-16 flex h-[calc(100vh-200px)] items-center justify-center">
          <div>
            <CalendarX size={"100px"} className="mx-auto text-secondary-600" />
            <h3 className="text-center text-2xl font-semibold text-secondary-600">
              No users found
            </h3>
            <h3 className="mx-auto text-center text-secondary-700">
              {`It looks like there are no users to display.`}
            </h3>
          </div>
        </div>
      )}

      {/* Create account dialog */}
      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent className="bg-secondary-100">
          <AccountCreate
            onFormSubmit={(user: AccountProfile) => {
              handleAddUser(user);
              setOpenCreateDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="bg-secondary-100">
          {editUserData && (
            <AccountEdit
              userData={editUserData}
              onFormSubmit={(updatedUser: AccountProfile) => {
                handleEditUser(updatedUser);
                setOpenEditDialog(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Accounts;
