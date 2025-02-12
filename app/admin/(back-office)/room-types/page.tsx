import React from "react";
import { AddRoomType } from "@/components/admin/room-types/add-room-type";
import RoomTypesTable from "./table";

const RoomsPage = async () => {
  return (
    <div className="flex flex-1 p-4 pt-0 flex-col gap-4">
      <div className="flex justify-end">
        <AddRoomType />
      </div>
      <RoomTypesTable />
    </div>
  );
};

export default RoomsPage;
