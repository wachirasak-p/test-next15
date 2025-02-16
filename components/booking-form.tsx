"use client";

import { useForm, useWatch } from "react-hook-form";
import { bookingSchema } from "@/lib/validations";
import { z } from "zod";
import { RoomType } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { DatePickerWithRange } from "./ui/date-range-picker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { createBooking } from "@/actions/booking";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

type BookingFormProps = {
  roomTypes: RoomType[] | [];
};

export const BookingForm = ({ roomTypes }: BookingFormProps) => {
  const { data } = useSession();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomTypeId: "",
      checkIn: new Date(),
      checkOut: new Date(),
      totalPrice: 0,
      name: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    form.setValue("name", data?.user?.name ?? "");
    form.setValue("email", data?.user?.email ?? "");
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    try {
      const { success, message } = await createBooking(values);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const roomTypeValue = useWatch({
    control: form.control,
    name: "roomTypeId",
  });

  useEffect(() => {
    const price = roomTypes.find(
      (roomType) => roomType.id === roomTypeValue
    )?.basePrice;
    form.setValue("totalPrice", price ?? 0);
    form.clearErrors("totalPrice");
  }, [roomTypes, roomTypeValue, form]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 2),
  });

  useEffect(() => {
    form.setValue("checkIn", date?.from ?? addDays(new Date(), 1));
    form.setValue("checkOut", date?.to ?? addDays(new Date(), 2));
  }, [date, form]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="roomTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ประเภทห้อง</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทห้องพัก" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomTypes.map((roomType) => (
                        <SelectItem key={roomType.id} value={roomType.id}>
                          {roomType.name} - {roomType.capacity} คน ราคา{" "}
                          {roomType.basePrice} บาท
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkIn"
              render={() => (
                <FormItem>
                  <FormLabel>เลือกวันที่เช็คอิน-เช็คเอาท์</FormLabel>
                  <FormControl>
                    <DatePickerWithRange date={date} setDate={setDate} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ราคารวม</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="ราคารวม" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input placeholder="ชื่อ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เบอร์โทรศัพท์</FormLabel>
                  <FormControl>
                    <Input placeholder="เบอร์โทรศัพท์" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อีเมล์</FormLabel>
                  <FormControl>
                    <Input placeholder="อีเมล์" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">จองห้องพัก</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
