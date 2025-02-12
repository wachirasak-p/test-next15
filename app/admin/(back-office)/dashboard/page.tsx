"use client";
import React from "react";

import { useSession } from "@/lib/auth-client";
type Props = {};

const DashboardPage = (props: Props) => {
  const { data } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data?.user?.email}</p>
    </div>
  );
};

export default DashboardPage;
