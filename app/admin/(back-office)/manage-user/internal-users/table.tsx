import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/admin/data-table";
import { getInternalUsers } from "@/actions/user";

const AdminsTable = async () => {
  const { data, success } = await getInternalUsers();

  if (!success) {
    return <div>Error fetching internal users</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminsTable;
