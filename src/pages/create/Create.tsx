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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Textarea } from "../../components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { Separator } from "../../components/ui/separator";
import { Checkbox } from "../../components/ui/checkbox";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  date: z
    .date()
    .refine((date) => date !== null, { message: "Date is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  expectedPax: z.number().min(1, { message: "Expected pax is required" }),
  description: z.string().min(6, { message: "Description is required" }),
  additionalServices: z.array(z.string()),
  additionalNotes: z.string(),
});

const additionalServices = [
  {
    id: "floristry",
    label: "Floral Arrangement Services",
  },
  {
    id: "setup",
    label: "Decor and Setup ",
  },
  {
    id: "audio_visual",
    label: "Audio-Visual Equipment Rental",
  },
  {
    id: "lighting",
    label: "Event Lighting Services",
  },
  {
    id: "entertainment",
    label: "Entertainment Services",
  },
];

const categories = [
  {
    id: "Birthday Party",
    label: "Birthday Party",
  },
  {
    id: "Wedding",
    label: "Wedding",
  },
  {
    id: "Seminar",
    label: "Seminar",
  },
  {
    id: "Reunion",
    label: "Reunion",
  },
  {
    id: "Corporate Party",
    label: "Corporate Party",
  },
];

const expectedPax = [
  {
    id: "1-25",
    ValueIcon: 25,
    label: "1-25",
  },
  {
    id: "26-50",
    value: 50,
    label: "26-50",
  },
  {
    id: "50+",
    value: 100,
    label: " 50+",
  },
];

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
  console.log("local date iso:", localDate.toISOString());

  return localDate.toISOString();
};

const convertToLocalTime = (utcIsoString: string) => {
  const utcDate = new Date(utcIsoString);

  const utcPlus8Date = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

  const hours = String(utcPlus8Date.getUTCHours()).padStart(2, "0");
  const minutes = String(utcPlus8Date.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

function Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const { spaceName } = location.state || {};

  console.log(spaceName);
  const [error, setError] = useState("");

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    expectedPax: 0,
    date: new Date(),
    startTime: "00:00",
    endTime: "00:00",
    category: "",
    additionalServices: [],
    additionalNotes: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (location.state && location.state.event) {
      const event = location.state.event;
      setInitialValues({
        title: event.title,
        description: event.description,
        expectedPax: event.expectedPax,
        date: new Date(event.date),
        startTime: convertToLocalTime(event.startTime),
        endTime: convertToLocalTime(event.endTime),
        category: event.category,
        additionalServices: event.additionalServices,
        additionalNotes: event.additionalNotes,
      });
      form.reset({
        title: event.title,
        description: event.description,
        expectedPax: event.expectedPax,
        date: new Date(event.date),
        startTime: convertToLocalTime(event.startTime),
        endTime: convertToLocalTime(event.endTime),
        category: event.category,
        additionalServices: event.additionalServices,
        additionalNotes: event.additionalNotes,
      });
    }
  }, [location.state, form]);

  const handlePreviewButton = async (values: z.infer<typeof FormSchema>) => {
    try {
      const event = {
        title: values.title,
        description: values.description,
        expectedPax: Number(values.expectedPax),
        date: values.date.toISOString(),
        startTime: formatDateTime(values.date, values.startTime),
        endTime: formatDateTime(values.date, values.endTime),
        category: values.category,
        additionalServices: values.additionalServices,
        additionalNotes: values.additionalNotes,
      };

      navigate("/dashboard/preview", { state: { event } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-3 text-2xl font-medium">Event Details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePreviewButton)}>
          <section className="w-full max-w-xl space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event date</FormLabel>
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
            <div className="flex flex-wrap items-center gap-4">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="mt-8 text-xs font-semibold">to</span>
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <TimeInput
                        aria-label="End Time"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Category</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      className="flex justify-start gap-2"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      {categories.map((item) => (
                        <ToggleGroupItem
                          key={item.id}
                          value={item.id}
                          className="border bg-secondary-300"
                        >
                          {item.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedPax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Pax</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      className="flex justify-start gap-2"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      {expectedPax.map((item) => (
                        <ToggleGroupItem
                          key={item.id}
                          value={item.value}
                          className="border bg-secondary-300"
                        >
                          {item.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about the event"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Separator className="mb-8 mt-10" />

          <section className="w-full max-w-xl space-y-5">
            <h2 className="mb-3 text-2xl font-medium">Additional Services</h2>
            <div className="grid grid-cols-2 gap-3">
              {additionalServices.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="additionalServices"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.label)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.label])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.label,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </section>

          <Separator className="mb-8 mt-10" />

          <section className="w-full max-w-xl space-y-5">
            <h2 className="mb-3 text-2xl font-medium">Additional Notes</h2>
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          {error && <FormMessage>{error}</FormMessage>}
          <Button
            type="button"
            className="mt-10 w-full max-w-40 rounded-full bg-primary-100 font-bold text-secondary-900 hover:bg-primary-200"
            onClick={form.handleSubmit(handlePreviewButton)}
          >
            Preview
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Create;
