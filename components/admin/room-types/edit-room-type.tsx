"use client";

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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Pencil } from "lucide-react";
import { updateRoomType, getRoomTypeById } from "@/actions/room-type";
import { roomTypeSchema } from "@/lib/validations";
import { RoomType } from "@prisma/client";

type FormData = z.infer<typeof roomTypeSchema>;

interface EditRoomTypeProps {
  roomType: RoomType;
}

export function EditRoomType({ roomType }: EditRoomTypeProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(roomTypeSchema),
    defaultValues: {
      name: roomType.name,
      description: roomType.description,
      capacity: roomType.capacity,
      basePrice: roomType.basePrice,
    },
  });

  useEffect(() => {
    const fetchRoomType = async () => {
      if (open) {
        setIsFetching(true);
        try {
          const result = await getRoomTypeById(roomType.id);
          if (!result.success) {
            throw new Error(result.message);
          }

          form.reset({
            name: result.data?.name || "",
            description: result.data?.description || "",
            capacity: result.data?.capacity || 0,
            basePrice: result.data?.basePrice || 0,
          });
        } catch (error) {
          toast.error("ไม่สามารถดึงข้อมูลประเภทห้องพักได้");
          console.error("Error fetching room type:", error);
          setOpen(false);
        } finally {
          setIsFetching(false);
          form.setFocus("name");
        }
      }
    };

    fetchRoomType();
  }, [open, roomType.id, form]);

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    try {
      const { success, message } = await updateRoomType(roomType.id, values);
      if (success) {
        toast.success(message);
        form.reset();
        setOpen(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>แก้ไขประเภทห้องพัก</DialogTitle>
              <DialogDescription>
                แก้ไขข้อมูลประเภทห้องพัก เมื่อเสร็จแล้วคลิกปุ่มบันทึก
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อประเภท</FormLabel>
                        <FormControl>
                          <Input placeholder="ชื่อประเภทห้องพัก" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>รายละเอียด</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="รายละเอียดประเภทห้องพัก"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ความจุ (คน)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="จำนวนคน"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="basePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ราคา</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="ราคา"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
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
