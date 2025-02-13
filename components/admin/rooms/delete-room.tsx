"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteRoom } from "@/actions/room";
import { Room } from "@prisma/client";

export function DeleteRoom({ room }: { room: Room }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await deleteRoom(room.id);
      if (!result.success) {
        throw new Error(result.message);
      }
      toast.success("ลบห้องพักเรียบร้อยแล้ว");
      setIsOpen(false);
    } catch (error) {
      toast.error("ไม่สามารถลบห้องพักได้");
      console.error("Error deleting room:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          variant="ghost"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ลบห้องพัก {room.roomNumber}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          คุณแน่ใจว่าต้องการลบห้องพักนี้หรือไม่?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            ลบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
