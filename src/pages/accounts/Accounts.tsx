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
import { getAllAccounts } from "../../services/accountApi"; // API function
import { Account } from "../../types/account"; // Type definition
import { Input } from "../../components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { CalendarX, Plus } from "lucide-react";

function Accounts() {
  const [users, setUsers] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllAccounts();
        setUsers(users.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter the users based on the search term
  const filteredUsers = users.filter((user) => {
    return (
      user.id.toString().toLowerCase().includes(searchTerm) ||
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phoneNumber?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-3 flex items-end justify-between">
        <Button className="bg-primary-100 text-secondary-900 hover:bg-primary-200">
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
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
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
    </div>
  );
}

export default Accounts;
