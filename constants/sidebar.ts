import {
  BedDouble,
  Calendar,
  GalleryVerticalEnd,
  Hotel,
  LayoutDashboard,
  SquareTerminal,
} from "lucide-react";

export const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export const company = {
  name: "Acme Inc",
  logo: GalleryVerticalEnd,
  plan: "Enterprise",
};

export const admin = {
  navMain: [
    {
      title: "หน้าแรก",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "จัดการโรงแรม",
      url: "/admin/hotels",
      icon: Hotel,
    },
    {
      title: "จัดการประเภทห้องพัก",
      url: "/admin/room-types",
      icon: BedDouble,
    },
    {
      title: "จัดการห้องพัก",
      url: "/admin/rooms",
      icon: BedDouble,
    },
    {
      title: "จัดการการจอง",
      url: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "จัดการผู้ใช้งาน",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "บุคลากร",
          url: "/admin/manage-user/internal-users",
        },
        {
          title: "ลูกค้า",
          url: "/admin/manage-user/members",
        },
      ],
    },
  ],
};
