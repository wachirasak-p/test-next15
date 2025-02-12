import React from "react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/admin/data-table";

type Props = {};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const HotelsPage = async (props: Props) => {
  const data = await getData();

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default HotelsPage;
