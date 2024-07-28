"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-[90vh] flex-col gap-5">
      <div className="font-bold text-[35px]">Page Not Found</div>
      <button className="min-w-[160px] bg-red-500 p-2 font-bold rounded-lg" onClick={() => router.push("/")}>Back To Home</button>
    </div>
  );
}
