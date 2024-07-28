"use client"
import { useRouter } from "next/navigation";
import React from "react";

export default function HeaderTable({ navigateTo, name, title }) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center  p-2">
        <div>{title}</div>

        {navigateTo === "-1" ? (
          <button className="font-semibold" onClick={() => router.back()}>
            {name}
          </button>
        ) : (
          <button
            className="font-semibold"
            onClick={() => router.push(navigateTo)}
          >
            {name}
          </button>
        )}
      </div>
      <div className="w-full h-[1px] mt-2 bg-slate-100"></div>
    </>
  );
}
