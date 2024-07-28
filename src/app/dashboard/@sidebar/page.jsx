import React from "react";
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoHome } from "react-icons/io5";

export default function SideBarDashboard() {
  return (
    <div className="fixed lg:w-[15%] smm:w-[40px] overflow-hidden bg-main h-[100vh] smm:h-[200vh] lg:px-2 py-4 ">
      <div>
        <ul className="smm:p-2 mt-5">
          <Link href={"/"}>
            <li className="flex gap-1 items-center text-white font-semibold smm:mb-4 mt-16">
              <IoHome size={20} />

              <p className="smm:hidden">Home</p>
            </li>
          </Link>
          <Link href={"/dashboard/category"}>
            <li className="flex gap-1 items-center text-white font-semibold smm:mb-4 mt-3">
              <BiCategoryAlt size={20} />
              <p className="smm:hidden">category</p>
            </li>
          </Link>
          <Link href={"/dashboard/product"}>
            <li className="flex gap-1 items-center text-white font-semibold smm:mb-4 mt-3">
              <MdProductionQuantityLimits size={20} />
              <p className="smm:hidden">product</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
