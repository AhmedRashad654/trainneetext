"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config";
import Image from "next/image";
import Navbar from "../_componant/Navbar";
import Footer from "../_componant/Footer";
function Details({ searchParams }) {
  const [detailsPro, setDetailsPro] = useState();
  useEffect(() => {
    if (searchParams?.catId && searchParams?.proId) {
      async function getDetails() {
        const refPro = doc(
          db,
          "category",
          searchParams.catId,
          "product",
          searchParams.proId
        );
        const docRef = await getDoc(refPro);
        setDetailsPro(docRef.data());
      }
      getDetails();
    }
  }, [searchParams.catId, searchParams.proId]);
  console.log(searchParams);
  return (
    <>
      <Navbar />
      <div className="mb-16 translate-y-[15%] min-h-[90vh]">
        <div className="w-full text-center mt-5 font-bold">
          <h4 className="text-[35px]">Details Product</h4>
        </div>
        {detailsPro && (
          <div className="flex justify-between gap-[50px] p-12 smml:block">
            <div className="mb-5 w-[50%] smm:w-[100%]">
              <Image
                src={detailsPro.img}
                alt="details"
                className="w-full"
                width={100}
                height={100}
              />
            </div>
            <div className="w-[50%] smm:w-[100%]">
              <h1 className="text-[25px] font-bold mb-3">{detailsPro?.name}</h1>
              <p className="font-medium">{detailsPro?.description}</p>
              <div className="flex justify-between items-center">
                <p className="mt-2">${detailsPro?.price}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Details;
