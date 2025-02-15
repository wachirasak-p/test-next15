import prisma from "@/lib/prisma";

export const getInternalUsers = async () => {
  try {
    const internalUsers = await prisma.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "STAFF"],
        },
      },
    });
    return {
      success: true as const,
      data: internalUsers,
    };
  } catch (error) {
    console.error("Error getting internal users:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลบุคลากร",
    };
  }
};

export const getMembers = async () => {
  try {
    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
      },
    });
    return {
      success: true as const,
      data: members,
    };
  } catch (error) {
    console.error("Error getting members:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิก",
    };
  }
};
