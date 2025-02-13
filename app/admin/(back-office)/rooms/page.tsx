import React from "react";
import RoomsTable from "./table";
import AddRoom from "@/components/admin/rooms/add-room";
import { getRoomTypes } from "@/actions/room-type";

const RoomsPage = async () => {
  const { data, success } = await getRoomTypes();
  return (
    <div className="flex flex-1 p-4 pt-0 flex-col gap-4">
      <div className="flex justify-end">
        <AddRoom roomTypes={data ?? []} />
      </div>
      <RoomsTable />
    </div>
  );
};

export default RoomsPage;
