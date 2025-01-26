import { Separator } from "../../components/ui/separator";
import { Account } from "../../types/account";
import { Catering } from "../../types/catering";
import { Event } from "../../types/event";

function AnalyticsHeader({
  events,
  caterings,
  accounts,
}: {
  events: Event[];
  caterings: Catering[];
  accounts: Account[];
}) {
  const approvedEvents = events.filter((event) => event.status === "APPROVED");

  const completedEvents = events.filter(
    (event) => event.status === "COMPLETED",
  );

  const eventsThisMonth = events.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const cateringsThisMonth = caterings.filter((catering) => {
    const eventDate = new Date(catering.event.date);
    const currentDate = new Date();
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const accountsRegisterdThisMonth = accounts.filter((account) => {
    const accountDate = account.createdAt
      ? new Date(account.createdAt)
      : new Date();
    const currentDate = new Date();
    return (
      accountDate.getMonth() === currentDate.getMonth() &&
      accountDate.getFullYear() === currentDate.getFullYear()
    );
  });

  return (
    <div className="mb-3 rounded-lg border border-secondary-600 bg-secondary-100 px-4 py-6 shadow-sm">
      <div className="flex">
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Events
          </h3>
          <p className="text-2xl font-semibold">{events?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Catering
          </h3>
          <p className="text-2xl font-semibold">{caterings?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Completed Events
          </h3>
          <p className="text-2xl font-semibold">{completedEvents?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Accounts
          </h3>
          <p className="text-2xl font-semibold">{accounts?.length}</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex">
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Events this month
          </h3>
          <p className="text-2xl font-semibold">{eventsThisMonth?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Catering this month
          </h3>
          <p className="text-2xl font-semibold">{cateringsThisMonth?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Accounts reg this month
          </h3>
          <p className="text-2xl font-semibold">
            {accountsRegisterdThisMonth?.length}
          </p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Approved Events
          </h3>
          <p className="text-2xl font-semibold">{approvedEvents?.length}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsHeader;
