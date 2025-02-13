"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoomWithRoomType } from "@/types/prisma-types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { DeleteRoom } from "@/components/admin/rooms/delete-room";
import { EditRoom } from "@/components/admin/rooms/edit-room";

export const columns: ColumnDef<RoomWithRoomType>[] = [
  {
    accessorKey: "roomNumber",
    header: "ห้องพัก",
  },
  {
    accessorKey: "roomType.name",
    header: "ประเภทห้องพัก",
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const room = row.original;
      return room.status === "AVAILABLE" ? (
        <Badge variant="default">ว่าง</Badge>
      ) : room.status === "OCCUPIED" ? (
        <Badge variant="outline">ไม่ว่าง</Badge>
      ) : (
        <Badge variant="destructive">ปิดปรับปรุง</Badge>
      );
    },
  },
  {
    accessorKey: "roomType.capacity",
    header: "ความจุ",
  },
  {
    accessorKey: "roomType.basePrice",
    header: "ราคา",
  },
  {
    accessorKey: "actions",
    header: "ดำเนินการ",
    cell: ({ row }) => {
      const room = row.original;
      return (
        <div className="flex items-center gap-2">
          <EditRoom room={room} />
          {room.status === "AVAILABLE" ? (
            <DeleteRoom room={room} />
          ) : (
            <Button
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              variant="ghost"
              onClick={() => {
                toast.error("ไม่สามารถลบประเภทห้องพักได้ เนื่องจากห้องไม่ว่าง");
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
