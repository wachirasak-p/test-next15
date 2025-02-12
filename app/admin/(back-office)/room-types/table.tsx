import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/admin/data-table";
import { getRoomTypes } from "@/actions/room-type";

const RoomTypesTable = async () => {
  const { data, success } = await getRoomTypes();

  if (!success) {
    return <div>Error fetching room types</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RoomTypesTable;
