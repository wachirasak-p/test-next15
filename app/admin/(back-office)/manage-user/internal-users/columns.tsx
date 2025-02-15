"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "ชื่อ",
  },
  {
    accessorKey: "email",
    header: "อีเมล",
  },
  {
    accessorKey: "role",
    header: "สิทธิ์",
  },
  {
    accessorKey: "createdAt",
    header: "วันที่สร้าง",
    cell: ({ row }) => {
      const user = row.original;
      return <span>{format(user.createdAt, "dd MMM yyyy")}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "วันที่แก้ไข",
    cell: ({ row }) => {
      const user = row.original;
      return <span>{format(user.updatedAt, "dd MMM yyyy")}</span>;
    },
  },
];
