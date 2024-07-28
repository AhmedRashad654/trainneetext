"use client";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useContext } from "react";
import { ContextUser } from "../../../context/ContextSendMessage";
import { Router, useRouter } from "next/navigation";

export default function Navbar() {
  const { auth } = useContext(ContextUser);
  const router = useRouter();
  async function handlelogout() {
    signOut(auth).then((res) => {
      router.push("/signin");
    });
  }
  return (
    <nav className="absolute top-0 left-0 bg-gray-300 w-full">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center px-8">
          <ul className="flex flex-row font-bold text-black mt-0 space-x-8 text-[1.2rem]">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/dashboard/category"}>Dashboard</Link>
            </li>
            <li>
              <button onClick={handlelogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
