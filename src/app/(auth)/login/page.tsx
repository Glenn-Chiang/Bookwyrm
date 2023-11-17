"use client";

import { Logo } from "@/components/Logo";
import { SubmitButton } from "@/components/buttons";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';

export default function Login() {
  const [isPending, setIsPending] = useState(false);

  const signInWithGoogle = async () => {
    setIsPending(true);
    await signIn("google", { callbackUrl: "/" }); // Redirect to home page on sign in
  };

  return (
    <>
      <Logo size="large" />
      <h1 className="text-sky-500">Welcome to Bookwyrm</h1>
      <p className="text-slate-500 text-center">
        Your account will be created for you if you&apos;re logging in for the
        first time
      </p>
      <SubmitButton isPending={isPending} onClick={signInWithGoogle}>
      <Image src={'https://google.com/favicon.ico'} alt="" width={20} height={20}/>
        Login with Google
      </SubmitButton>
    </>
  );
}
