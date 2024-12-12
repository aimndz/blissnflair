interface Event {
  createdAt: string;
}

interface Account {
  createdAt: string;
}

export const getPast7DaysData = (events: Event[]) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const todayISOString = today.toISOString().split("T")[0];
  const sevenDaysAgoISOString = sevenDaysAgo.toISOString().split("T")[0];

  const filteredEvents = events.filter((event) => {
    const eventDate = event.createdAt.split("T")[0];
    return eventDate >= sevenDaysAgoISOString && eventDate <= todayISOString;
  });

  const last7Days = [...Array(7)].map((_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - index));
    return day.toISOString().split("T")[0];
  });

  const chartData = last7Days.map((_, index) => ({
    day: index + 1,
    events: 0,
  }));

  filteredEvents.forEach((event) => {
    const eventDate = event.createdAt.split("T")[0];
    const dayIndex = last7Days.indexOf(eventDate);
    if (dayIndex !== -1) {
      chartData[dayIndex].events += 1;
    }
  });

  return chartData;
};

export const getPast7DaysAccountData = (accounts: Account[]) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7); // Set the date 7 days ago

  // Convert both dates to ISO strings (to ignore time part)
  const todayISOString = today.toISOString().split("T")[0];
  const sevenDaysAgoISOString = sevenDaysAgo.toISOString().split("T")[0];

  // Filter accounts that were created in the last 7 days
  const filteredAccounts = accounts.filter((account) => {
    const accountDate = account.createdAt.split("T")[0]; // Extract date part
    return (
      accountDate >= sevenDaysAgoISOString && accountDate <= todayISOString
    );
  });

  // Prepare chart data for the last 7 days, starting from today
  const last7Days = [...Array(7)].map((_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - index)); // Reverse the index to make today "Day 1"
    return day.toISOString().split("T")[0]; // Get the date in 'YYYY-MM-DD' format
  });

  const chartData = last7Days.map((_, index) => ({
    day: index + 1, // Day 1 = today, Day 7 = 7 days ago
    accounts: 0,
  }));

  // Count accounts for each of the past 7 days
  filteredAccounts.forEach((account) => {
    const accountDate = account.createdAt.split("T")[0]; // Extract date part
    const dayIndex = last7Days.indexOf(accountDate);
    if (dayIndex !== -1) {
      chartData[dayIndex].accounts += 1;
    }
  });

  return chartData;
};
