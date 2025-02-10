"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {};

const MainNav = (props: Props) => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };
  return (
    <div>
      <Link href="/">Home</Link>

      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};

export default MainNav;
