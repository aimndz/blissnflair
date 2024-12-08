import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { z } from "zod";
import { TimeInput } from "@nextui-org/date-input";
import { Time } from "@internationalized/date";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Textarea } from "../../components/ui/textarea";
import Combobox from "../../components/ui/combobox";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";

const FormSchema = z.object({
  date: z
    .date()
    .refine((date) => date !== null, { message: "Date is required" })
    .refine((date) => date >= new Date(), {
      message: "Event date should not be in the past",
    }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});

const stringToTimeValue = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return new Time(hours, minutes);
};

const timeValueToString = (time: Time) => {
  return `${time.hour.toString().padStart(2, "0")}:${time.minute
    .toString()
    .padStart(2, "0")}`;
};

const formatDateTime = (date: Date, time: string) => {
  const localDate = new Date(date);
  const [hours, minutes] = time.split(":").map(Number);

  // Combine date and time in local time zone
  localDate.setHours(hours, minutes, 0, 0);

  return localDate.toISOString();
};

const convertToLocalTime = (utcIsoString: string) => {
  const utcDate = new Date(utcIsoString);

  const utcPlus8Date = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

  const hours = String(utcPlus8Date.getUTCHours()).padStart(2, "0");
  const minutes = String(utcPlus8Date.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

function PrivateRoomInfo() {
  const navigate = useNavigate();
  const routePrefix = useRoutePrefix();
  const [error, setError] = useState("");
  const location = useLocation();

  const { spaceName } = location.state || {};
  const [additionalHours, setAdditionalHours] = useState(0);

  const incrementHours = () => {
    setAdditionalHours((prevHours) => (prevHours < 10 ? prevHours + 1 : 10));
  };

  const decrementHours = () => {
    setAdditionalHours((prevHours) => (prevHours > 0 ? prevHours - 1 : 0));
  };

  const calculateEndTime = (
    date: Date,
    startTime: string,
    additionalHours: number,
  ): string => {
    const localDate = new Date(date);

    const [hours, minutes] = startTime.split(":").map(Number);

    localDate.setHours(hours, minutes, 0, 0);
    localDate.setHours(localDate.getHours() + 4 + additionalHours);

    return localDate.toISOString();
  };

  const [initialValues, setInitialValues] = useState({
    date: new Date(),
    startTime: "00:00",
    endTime: "00:00",
    additionalHours: 0,
  });

  const form = useForm<
    z.infer<typeof FormSchema> & { additionalHours: number }
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (location.state && location.state.event) {
      const event = location.state.event;
      const updatedEndTime = calculateEndTime(
        event.date,
        event.startTime,
        additionalHours,
      );

      setInitialValues({
        date: new Date(event.date),
        startTime: convertToLocalTime(event.startTime),
        endTime: updatedEndTime,
        additionalHours: event.additionalHours,
      });
      form.reset({
        date: new Date(event.date),
        startTime: convertToLocalTime(event.startTime),
        endTime: updatedEndTime,
        additionalHours: event.additionalHours,
      });
    }
  }, [location.state, form, additionalHours]);

  useEffect(() => {
    const updatedEndTime = calculateEndTime(
      initialValues.date,
      initialValues.startTime,
      additionalHours,
    );

    setInitialValues((prev) => ({ ...prev, endTime: updatedEndTime }));
    form.setValue("endTime", updatedEndTime);
  }, [initialValues.startTime, initialValues.date, additionalHours, form]);

  const handleCateringButton = async (values: z.infer<typeof FormSchema>) => {
    try {
      const event = {
        date: values.date.toISOString(),
        startTime: formatDateTime(values.date, values.startTime),
        endTime: calculateEndTime(
          values.date,
          values.startTime,
          additionalHours,
        ),
        additionalNotes: values.additionalNotes,
        additionalHours,
        spaceName,
      };

      console.log(event);

      navigate(`/${routePrefix}/create/catering`, { state: { event } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-3 text-2xl font-medium">Private room details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCateringButton)}>
          <section className="w-full space-y-5">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <FormLabel className="text-nowrap">Schedule date</FormLabel>
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] bg-secondary-100 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-10">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <TimeInput
                        aria-label="Start Time"
                        value={stringToTimeValue(field.value)}
                        onChange={(time) =>
                          field.onChange(timeValueToString(time))
                        }
                        classNames={{
                          segment: "focus:bg-secondary-300",
                          inputWrapper: "hover:bg-secondary-100",
                        }}
                        className="rounded-md border border-solid border-secondary-300 bg-secondary-100"
                      />
                    </FormControl>
                    <p className="text-xs italic">*4 hours venue usage</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Additional Extra Hours</FormLabel>
                <FormControl>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      className="border border-secondary-600 bg-secondary-200 text-secondary-900 shadow-none hover:bg-secondary-300 active:bg-secondary-300"
                      type="button"
                      onClick={decrementHours}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={additionalHours}
                      readOnly
                      className="mx-3 w-full max-w-11 text-center"
                    />
                    <Button
                      className="border border-secondary-600 bg-secondary-200 text-secondary-900 shadow-none hover:bg-secondary-300 active:bg-secondary-300"
                      type="button"
                      onClick={incrementHours}
                    >
                      +
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* <span className="mt-8 text-xs font-semibold">to</span> */}
              {/* <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => {
                  const startTime = form.getValues("startTime");

                  return (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <TimeInput
                          aria-label="End Time"
                          value={stringToTimeValue(startTime)}
                          onChange={(time) =>
                            field.onChange(timeValueToString(time))
                          }
                          classNames={{
                            segment: "focus:bg-secondary-300",
                            inputWrapper: "hover:bg-secondary-100",
                          }}
                          className="rounded-md border border-solid border-secondary-300 bg-secondary-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}
            </div>
          </section>
          {error && <FormMessage>{error}</FormMessage>}
          <div className="flex justify-end">
            <Button
              type="button"
              className="mt-5 w-full max-w-40 rounded-full bg-primary-100 px-28 font-semibold text-secondary-900 hover:bg-primary-200"
              onClick={form.handleSubmit(handleCateringButton)}
            >
              Proceed <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PrivateRoomInfo;
