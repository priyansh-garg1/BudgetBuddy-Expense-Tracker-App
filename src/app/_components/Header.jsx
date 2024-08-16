"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center">
        <svg
          id="logo-35"
          width="50"
          height="39"
          viewBox="0 0 50 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            class="ccompli1"
            fill="#007AFF"
          ></path>{" "}
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            class="ccustom"
            fill="#312ECB"
          ></path>{" "}
        </svg>
        <span className="text-blue-800  font-bold text-base md:text-xl">BudgetBuddy</span>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-3  items-center ">
          <Link className="hidden md:block" href={"/dashboard"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
