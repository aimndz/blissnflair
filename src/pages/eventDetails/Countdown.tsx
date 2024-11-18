import { CheckSquare2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CountdownProps {
  eventStartTime: string;
  eventEndTime: string;
}

function Countdown({ eventStartTime, eventEndTime }: CountdownProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: "",
  });

  const calculateCountdown = (eventStartTime: string, eventEndTime: string) => {
    const eventStartDate = new Date(eventStartTime);
    const eventEndDate = new Date(eventEndTime);

    const now = new Date();
    const timeDifference = eventStartDate.getTime() - now.getTime();

    if (now >= eventStartDate && now <= eventEndDate) {
      // Event is ongoing
      setCountdown({
        message: "Event is ongoing",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    if (now > eventEndDate) {
      // Event has ended
      setCountdown({
        message: "Event has ended",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate full days
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24); // Remaining hours
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60); // Remaining minutes
    const seconds = Math.floor((timeDifference / 1000) % 60); // Remaining seconds

    setCountdown({
      message: "",
      days,
      hours,
      minutes,
      seconds,
    });
  };

  useEffect(() => {
    calculateCountdown(eventStartTime, eventEndTime);

    const interval = setInterval(() => {
      calculateCountdown(eventStartTime, eventEndTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [eventStartTime, eventEndTime]);

  return (
    <div className="mb-5">
      {countdown.message && (
        <div className="mb-3 flex items-center gap-3 text-xl font-bold text-secondary-700">
          <CheckSquare2 size={20} />{" "}
          <span className="text-xl font-bold">{countdown.message}</span>
        </div>
      )}
      <p className="font-medium">Time left before the event:</p>
      <div className="flex items-center gap-3">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300 text-center text-xl font-bold">
            {countdown.days}
          </div>
          <p className="mt-1 text-center text-xs uppercase">Days</p>
        </div>
        <div className="mt-[-20px] text-lg font-bold">:</div>
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300 text-center text-xl font-bold">
            {countdown.hours}
          </div>
          <p className="mt-1 text-center text-xs uppercase">Hrs</p>
        </div>
        <div className="mt-[-20px] text-lg font-bold">:</div>
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300 text-center text-xl font-bold">
            {countdown.minutes}
          </div>
          <p className="mt-1 text-center text-xs uppercase">Mins</p>
        </div>
        <div className="mt-[-20px] text-lg font-bold">:</div>
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300 text-center text-xl font-bold">
            {countdown.seconds}
          </div>
          <p className="mt-1 text-center text-xs uppercase">Secs</p>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
