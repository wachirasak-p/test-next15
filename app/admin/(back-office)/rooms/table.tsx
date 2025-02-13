import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/admin/data-table";
import { getRooms } from "@/actions/room";

const RoomsTable = async () => {
  const { data, success } = await getRooms();

  if (!success) {
    return <div>Error fetching room types</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RoomsTable;
