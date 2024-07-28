"use client";
import HeaderCategory from "@/app/_componant/HeaderCategory";
import Navbar from "@/app/_componant/Navbar";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../../../../config";
import { useRouter } from "next/navigation";
import Footer from "@/app/_componant/Footer";

export default function CategortDetails({ params,searchParams }) {
  const [catPro, setCatPro] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const catRef = collection(db, "category", params.catId, "product");
    const unSubscribe = onSnapshot(catRef, (snapShot) => {
      if (!snapShot.empty) {
        let arr = [];
        snapShot.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));
        setCatPro(arr);
      } else {
        setCatPro([]);
      }
    });
    return () => unSubscribe();
  }, [params.catId]);
  
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <HeaderCategory />
      </div>
      <div className="mx-auto w-[95%] my-5">
        <div>
          <h3 className="font-bold text-[25px] mt-20 mb-3 ml-[5px]">
            {" "}
            Products/<span className="text-red-500">{searchParams.name}</span>
          </h3>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-5">
          {catPro &&
            catPro?.map((product, index) => (
              <div
                key={index}
                className="product overflow-hidden px-2 py-3 position-relative"
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
      <Footer />
    </>
  );
}
