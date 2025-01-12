import { Separator } from "../../components/ui/separator";
import { Account } from "../../types/account";

function AccountHeader({ accounts }: { accounts: Account[] }) {
  const accountsThisMonth = accounts.filter((account) => {
    const accountDate = new Date(account.createdAt);
    const currentDate = new Date();
    return (
      accountDate.getMonth() === currentDate.getMonth() &&
      accountDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const adminAccounts = accounts.filter((account) => account.role === "ADMIN");
  const userAccounts = accounts.filter((account) => account.role === "USER");

  return (
    <div className="mb-3 rounded-lg border border-secondary-600 bg-secondary-100 px-4 py-6 shadow-sm">
      <div className="flex">
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Total Accounts
          </h3>
          <p className="text-2xl font-semibold">{accounts?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            New accounts this month
          </h3>
          <p className="text-2xl font-semibold">{accountsThisMonth.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            User Accounts
          </h3>
          <p className="text-2xl font-semibold">{userAccounts?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Admin Accounts
          </h3>
          <p className="text-2xl font-semibold">{adminAccounts?.length}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountHeader;
