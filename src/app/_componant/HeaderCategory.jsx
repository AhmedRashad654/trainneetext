"use client"
import React, { useContext } from "react";
import Image from "next/image";
import { ContextUser } from "../../../context/ContextSendMessage";
import { useRouter } from "next/navigation";
export default function HeaderCategory() {
  const { category } = useContext(ContextUser);
  const router = useRouter();

  return (
    <div className="w-[95%] mx-auto">
      <div className="flex justify-center text-[90px] items-center w-full mt-5">
        <h2 className="text-[40px]  text-red-500 font-bold">Category</h2>
      </div>
      <div className=" my-5 flex flex-wrap gap-[100px] p-5 w-full justify-center">
        {category &&
          category.map((cat) => (
            <div
              className="cursor-pointer flex flex-col items-center w-[100px] text-center"
              key={cat?.id}
              onClick={() =>
                router.push(`/categoryuser/${cat.id}?name=${cat.name}`)
              }
            >
              <Image
                src={cat?.img}
                alt={`${category?.name}`}
                className="w-[100px] h-[100px] rounded-full mb-2 border border-red-400 hover:scale-105 transition-all duration-100"
                width={100}
                height={100}
              />
              <h6 className="text-red-500 font-semibold">{cat?.name}</h6>
            </div>
          ))}
      </div>
    </div>
  );
}
