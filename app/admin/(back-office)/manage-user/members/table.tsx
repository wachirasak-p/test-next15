import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/admin/data-table";
import { getMembers } from "@/actions/user";

const MembersTable = async () => {
  const { data, success } = await getMembers();

  if (!success) {
    return <div>Error fetching members</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MembersTable;
