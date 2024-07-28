"use client";
import React, { useState } from "react";
import HeaderTable from "../../@header/page";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../../config";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
export default function UpdateCategoryDashboard({ searchParams }) {
  const [uploadImage, setUploadImage] = useState(searchParams.img);
  const [name, setName] = useState(searchParams.name);
  const [upImg, setUpImg] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleUploadImage(e) {
    setLoadingImage(true);
    setUpImg(true);
    const file = e.target.files[0];
    const imgRef = ref(storage, `/images/${file.name}`);
    const snapshot = await uploadBytes(imgRef, file);
    const url = await getDownloadURL(snapshot.ref);
    setUploadImage(url);
    setLoadingImage(false);
  }
  async function handleUpdata() {
    setLoading(true);
    let obj;
    if (upImg) {
      obj = {
        name: name,
        img: uploadImage,
      };
    }
    if (!upImg) {
      obj = {
        name: name,
      };
    }
    const docRef = doc(db, "category", searchParams.id);
    await updateDoc(docRef, obj);
    setLoading(false);
    setUploadImage("");
    toast.success("updata category successfully");
    setUpImg(false);
    router.push("/dashboard/category");
  }
  return (
    <div className="w-[95%] lg:max-w-lg mx-auto translate-y-[20%] bg-white min-h-96 p-3">
      <div>
        <HeaderTable
          navigateTo={"-1"}
          name={"back"}
          title={"update category"}
        />
      </div>
      <div className="mt-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="border border-slate-300 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="updateCategory" className="cursor-pointer">
            image
            <p className="border border-primaryDashboard p-1 rounded-lg mt-2">
              {loadingImage ? "Loading..." : "updata Image"}
            </p>
          </label>
          <input
            type="file"
            id="updateCategory"
            onChange={handleUploadImage}
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px] hidden"
          />
        </div>
        <div>
          <button
            onClick={handleUpdata}
            className="bg-buttonDashboard w-full mt-3 rounded-md p-1 duration-150 transition-all text-white font-semibold bg-purple-700"
          >
            {loading ? "Loading..." : "  Updata Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
