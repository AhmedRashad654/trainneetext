"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { ContextUser } from "../../../context/ContextSendMessage";
import { useRouter } from "next/navigation";

function Products() {
  const { product } = useContext(ContextUser);
  const router = useRouter();
  return (
    <div className="mx-auto w-[95%] my-5">
      <div>
        <h3 className="font-bold text-[20px] mt-20 mb-3 ml-[5px]">
          All Products
        </h3>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-5">
        {product &&
          product?.map((product, index) => (
            <div
              key={index}
              className="product overflow-hidden px-2 py-3  position-relative"
            >
              <Image
                width={100}
                height={100}
                className="w-full h-[200px]"
                src={product.img}
                alt="product"
              />
              <h5 className=" text-main mt-3 font-bold">
                {product.name.split(" ").slice(0, 3).join(" ")}
              </h5>
              <h6 className=" mt-1">{product.price}</h6>
              <button
                className="p-1 bg-red-600 font-bold w-full mt-2 rounded-md cursor-pointer hover:bg-red-500"
                onClick={() =>
                  router.push(
                    `/productdetails?catId=${product.categoryId}&&proId=${product.id}`
                  )
                }
              >
                Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
