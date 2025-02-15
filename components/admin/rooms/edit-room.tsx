"use client";

import { getRoomById, updateRoom } from "@/actions/room";
import { getRoomTypes } from "@/actions/room-type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { roomSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Room, RoomType } from "@prisma/client";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditRoomProps {
  room: Room;
}

export function EditRoom({ room }: EditRoomProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomNumber: room.roomNumber,
      roomTypeId: room.roomTypeId,
      status: room.status,
    },
  });

  useEffect(() => {
    const fetchRoomType = async () => {
      if (open) {
        setIsFetching(true);
        try {
          const result = await getRoomById(room.id);
          if (!result.success) {
            toast.error(result.message);
          }
          const roomTypes = await getRoomTypes();
          if (!roomTypes.success) {
            toast.error(roomTypes.message);
          }

          setRoomTypes(roomTypes.data || []);

          form.reset({
            roomNumber: result.data?.roomNumber || "",
            roomTypeId: result.data?.roomTypeId || "",
            status: result.data?.status || "AVAILABLE",
          });
        } catch (error) {
          console.log(error);
          setOpen(false);
        } finally {
          setIsFetching(false);
          form.setFocus("roomNumber");
        }
      }
    };

    fetchRoomType();
  }, [open, room.id, form]);

  const onSubmit = async (values: z.infer<typeof roomSchema>) => {
    setIsLoading(true);
    const result = await updateRoom(room.id, values);
    if (result.success) {
      toast.success(result.message);
      setOpen(false);
      form.reset();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>แก้ไขห้องพัก {room.roomNumber}</DialogTitle>
              <DialogDescription>
                แก้ไขข้อมูลห้องพักที่ต้องการแก้ไข เมื่อเสร็จแล้วคลิกปุ่มบันทึก
              </DialogDescription>
            </DialogHeader>

            {isFetching ? (
              <div className="flex justify-center items-center h-full pb-4">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อห้องพัก/เลขห้องพัก</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ชื่อห้องพัก/เลขห้องพัก"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roomTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ประเภทห้อง</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกประเภทห้องพัก" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roomTypes.map((roomType) => (
                              <SelectItem key={roomType.id} value={roomType.id}>
                                {roomType.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชั้น</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ชั้น"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>สถานะ</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกสถานะห้องพัก" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AVAILABLE">ว่าง</SelectItem>
                            <SelectItem value="OCCUPIED">ไม่ว่าง</SelectItem>
                            <SelectItem value="MAINTENANCE">
                              ปิดปรับปรุง
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        กำลังบันทึก...
                      </>
                    ) : (
                      "บันทึก"
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
