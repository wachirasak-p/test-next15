"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoomTypeWithRooms } from "@/types/prisma-types";
import { EditRoomType } from "@/components/admin/room-types/edit-room-type";
import { DeleteRoomType } from "@/components/admin/room-types/delete-room-type";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
export const columns: ColumnDef<RoomTypeWithRooms>[] = [
  {
    accessorKey: "name",
    header: "ชื่อประเภทห้องพัก",
  },
  {
    accessorKey: "description",
    header: "รายละเอียด",
  },
  {
    accessorKey: "capacity",
    header: "ความจุ",
  },
  {
    accessorKey: "basePrice",
    header: "ราคา",
  },
  {
    accessorKey: "actions",
    header: "ดำเนินการ",
    cell: ({ row }) => {
      const roomType = row.original;
      return (
        <div className="flex items-center gap-2">
          <EditRoomType roomType={roomType} />
          {roomType.rooms.length === 0 ? (
            <DeleteRoomType roomType={roomType} />
          ) : (
            <Button
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              variant="ghost"
              onClick={() => {
                toast.error(
                  "ไม่สามารถลบประเภทห้องพักได้ เนื่องจากมีห้องพักอยู่"
                );
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      );
    },
  },
];
