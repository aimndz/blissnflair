import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";
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
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Textarea } from "../../components/ui/textarea";
import Combobox from "../../components/ui/combobox";
import { useUser } from "../../hooks/use-user";
import { toast } from "sonner";
import { updateEvent } from "../../services/eventApi";
import { mapValidationErrors } from "../../utils/mapValidationErrors";
import CustomToast from "../../components/toasts/CustomToast";

const venue = [
  {
    value: "lounge hall",
    label: "Lounge Hall",
  },
  {
    value: "function hall",
    label: "Function Hall",
  },
  {
    value: "al fresco",
    label: "Al Fresco",
  },
];

const createFormSchema = (userRole: string) => {
  return z.object({
    title: z.string().min(1, { message: "Event title is required" }),
    eventImage: z
      .union([z.string().url(), z.instanceof(File)])
      .optional()
      .refine(
        (file) =>
          !file ||
          typeof file === "string" ||
          (file instanceof File && file.type.startsWith("image/")),
        {
          message: "File must be a valid image",
        },
      )
      .refine(
        (file) =>
          !file ||
          typeof file === "string" ||
          (file.size > 0 && file.size <= 5 * 1024 * 1024),
        {
          message: "File size must be less than 5 MB",
        },
      ),
    date: z
      .date()
      .refine((date) => date !== null, { message: "Date is required" })
      .refine(
        (date) =>
          date >= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        {
          message: "Event date should be at least 7 days from now",
        },
      ),
    venue: z.string().min(1, { message: "Event venue is required" }),
    organizer: z.string().refine(
      (val) => {
        // Make it required if userRole is ADMIN
        if (userRole === "ADMIN") {
          return val.length > 0;
        }
        return true;
      },
      { message: "Organizer name is required" },
    ),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
    category: z.string().min(1, { message: "Event category is required" }),
    description: z
      .string()
      .min(1, { message: "Event description is required" }),
    additionalNotes: z.string(),
  });
};

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

function EventEditDialog({ open, onClose, event, onUpdate }) {
  const [error, setError] = useState<{ [key: string]: string } | string>("");
  const location = useLocation();
  const { user } = useUser();
  const [previewImage, setPreviewImage] = useState<string | null>(
    event?.imageUrl ?? null,
  );

  const userRole = user?.role || "USER";
  const FormSchema = createFormSchema(userRole);

  const { spaceName, currentDate } = location.state || {};
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
    title: "",
    eventImage: undefined,
    organizer: "",
    description: "",
    date: currentDate || new Date(),
    venue: spaceName || "",
    startTime: "00:00",
    endTime: "00:00",
    category: "",
    additionalNotes: "",
    additionalHours: 0,
  });

  const form = useForm<
    z.infer<typeof FormSchema> & { additionalHours: number }
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (event) {
      const updatedStartTime = parseISO(event.startTime);
      const localUpdatedStartTime = format(updatedStartTime, "HH:mm");

      const updatedEndTime = calculateEndTime(
        event.date,
        localUpdatedStartTime,
        additionalHours,
      );

      setInitialValues({
        title: event.title,
        eventImage: event.imageUrl,
        organizer:
          event.organizer || `${event.user.firstName} ${event.user.lastName}`,
        description: event.description,
        date: new Date(event.date),
        startTime: convertToLocalTime(event.startTime),
        venue: event.venue,
        endTime: updatedEndTime,
        category: event.category,
        additionalNotes: event.additionalNotes,
        additionalHours: event.additionalHours,
      });

      setPreviewImage(event.imageUrl);

      form.reset({
        title: event.title,
        eventImage: event.imageUrl,
        organizer:
          event.organizer || `${event.user.firstName} ${event.user.lastName}`,
        description: event.description,
        date: new Date(event.date),
        venue: event.venue,
        startTime: convertToLocalTime(event.startTime),
        endTime: updatedEndTime,
        category: event.category,
        additionalNotes: event.additionalNotes,
        additionalHours: event.additionalHours,
      });
    }
  }, [event, additionalHours, form]);

  useEffect(() => {
    const updatedEndTime = calculateEndTime(
      initialValues.date,
      initialValues.startTime,
      additionalHours,
    );

    setInitialValues((prev) => ({ ...prev, endTime: updatedEndTime }));
    form.setValue("endTime", updatedEndTime);
  }, [initialValues.startTime, initialValues.date, additionalHours, form]);

  const handleUpdate = async (values: z.infer<typeof FormSchema>) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("organizer", values.organizer);
    formData.append("description", values.description);
    formData.append("date", values.date.toISOString());
    formData.append("venue", values.venue);
    formData.append("startTime", formatDateTime(values.date, values.startTime));
    formData.append(
      "endTime",
      calculateEndTime(values.date, values.startTime, additionalHours),
    );
    formData.append("category", values.category);
    formData.append("additionalNotes", values.additionalNotes);
    formData.append("additionalHours", String(additionalHours));
    formData.append("spaceName", spaceName);

    if (values.eventImage) {
      formData.append("eventImage", values.eventImage);
    }

    formData.append("status", event.status);

    try {
      const res = await updateEvent(event.id, formData);
      if (res.success) {
        onUpdate(res.data.event);
        onClose();
        toast.custom(() => (
          <CustomToast type="success" message="Event updated successfully" />
        ));
      } else {
        const fieldErrors = mapValidationErrors(res.errors);
        setError(fieldErrors);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {
        toast.custom(() => (
          <CustomToast
            type="error"
            message={"Please select a valid image file"}
          />
        ));
        return;
      }

      //5 MB
      if (file.size > 5 * 1024 * 1024) {
        toast.custom(() => (
          <CustomToast
            type="error"
            message={"Image size must be less than 5 MB"}
          />
        ));
        return;
      }

      setPreviewImage(URL.createObjectURL(file));
      form.setValue("eventImage", file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-[calc(100vh-10rem)] w-full max-w-2xl overflow-y-scroll bg-secondary-100">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <section className="w-full space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-center">
                    <FormField
                      control={form.control}
                      name="eventImage"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col items-center">
                          <FormControl>
                            <div
                              className={`mt-2 flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg ${previewImage ? "border-0" : "border-2 border-dashed"} `}
                              onClick={() =>
                                document.getElementById("avatarInput")?.click()
                              }
                            >
                              {previewImage ? (
                                <img
                                  src={previewImage}
                                  alt="Preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <p className="flex flex-col items-center justify-center text-gray-400">
                                  <Plus /> <span>Event image</span>
                                </p>
                              )}
                            </div>
                            {/* Move Input outside FormControl */}
                          </FormControl>
                          <Input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., John's 25th Birthday"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organizer"
                      render={({ field }) => (
                        <FormItem
                          className={userRole !== "ADMIN" ? "hidden" : ""}
                        >
                          <FormLabel>Organizer name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event category *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Birthday, Wedding, Corporate, Social Gathering"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="venue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event venue *</FormLabel>
                          <FormControl>
                            <Combobox
                              items={venue}
                              label="Select a venue"
                              value={field.value}
                              onChange={(value) => {
                                if (userRole === "ADMIN") {
                                  field.onChange(value); // Allow change if admin
                                }
                              }}
                              className="w-full"
                              disabled={userRole !== "ADMIN"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="disabled:opacity-50">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <FormLabel className="text-nowrap">
                            Event date *
                          </FormLabel>
                          <p className="text-sm italic text-gray-500">
                            ( <span className="font-medium">Tip:</span> Schedule
                            your event 1 month ahead for better approval
                            chances. )
                          </p>
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
                                disabled={userRole !== "ADMIN"}
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
                              disabled={userRole !== "ADMIN"}
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
                          <FormLabel>Start Time *</FormLabel>
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
                              isDisabled={userRole !== "ADMIN"}
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
                            disabled={userRole !== "ADMIN"}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={additionalHours}
                            readOnly
                            className="mx-3 w-full max-w-11 text-center"
                            disabled={userRole !== "ADMIN"}
                          />
                          <Button
                            className="border border-secondary-600 bg-secondary-200 text-secondary-900 shadow-none hover:bg-secondary-300 active:bg-secondary-300"
                            type="button"
                            onClick={incrementHours}
                            disabled={userRole !== "ADMIN"}
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
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description *</FormLabel>
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

              <section className="mt-5 w-full space-y-5">
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Note ( Optional )</FormLabel>
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
              {/* <div className="flex justify-end">
                <Button
                  type="button"
                  className="mt-5 w-full max-w-40 rounded-full bg-primary-100 px-28 font-semibold text-secondary-900 hover:bg-primary-200"
                  onClick={form.handleSubmit(handleCateringButton)}
                >
                  Proceed to Catering <ArrowRight />
                </Button>
              </div> */}
              <Button
                type="submit"
                className="mt-3 w-full rounded-full bg-primary-100 font-bold text-secondary-100 hover:bg-primary-200"
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventEditDialog;
