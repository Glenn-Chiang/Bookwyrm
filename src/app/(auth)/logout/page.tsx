"use client";

import { SubmitButton } from "@/components/buttons";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Logout() {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      Are you sure you want to logout?
      <SubmitButton onClick={handleClick} isPending={isPending}>
        Logout
      </SubmitButton>
    </>
  );
}
