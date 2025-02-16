"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { th } from "date-fns/locale";
import buddhistEra from "dayjs/plugin/buddhistEra";
import dayjs from "dayjs";
import "dayjs/locale/th";

dayjs.extend(buddhistEra);
// dayjs.locale("thLocale");

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: addDays(new Date(), 1),
  // });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {/* {format(date.from, "dd MMM yyyy", { locale: th })} -{" "}
                  {format(date.to, "dd MMM yyyy", { locale: th })} */}
                  {dayjs(date.from).locale("th").format("DD MMM BBBB")} -{" "}
                  {dayjs(date.to).locale("th").format("DD MMM BBBB")}
                </>
              ) : (
                dayjs(date.from).locale("th").format("DD MMM BBBB")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            locale={th}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              console.log(range);
              setDate(range);
            }}
            numberOfMonths={2}
            disabled={{
              before: new Date(),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
