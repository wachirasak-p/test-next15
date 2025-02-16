import React from "react";
import { BookingForm } from "@/components/booking-form";
import { getRoomTypes } from "@/actions/room-type";
const BookingPage = async () => {
  const { data, success } = await getRoomTypes();

  if (!success) {
    return <div>เกิดข้อผิดพลาดในการดึงข้อมูลประเภทห้องพัก</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">จองห้องพัก</h1>
      <BookingForm roomTypes={data.sort((a, b) => a.basePrice - b.basePrice)} />
    </div>
  );
};

export default BookingPage;
