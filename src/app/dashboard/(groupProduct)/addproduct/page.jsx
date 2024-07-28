"use client";
import React, { useContext, useState } from "react";
import HeaderTable from "../../@header/page";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ContextUser } from "../../../../../context/ContextSendMessage";
import { toast } from "react-toastify";
export default function AddProduct() {
  const [uploadImage, setUploadImage] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [name, setName] = useState();
  const [ price, setPrice ] = useState();
  const [description, setDescription] = useState();
  
  const { category } = useContext(ContextUser);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleUploadImage(e) {
    setLoadingImage(true);
    const file = e.target.files[0];
    const imgRef = ref(storage, `/images/${file.name}`);
    const snapshot = await uploadBytes(imgRef, file);
    const url = await getDownloadURL(snapshot.ref);
    setUploadImage(url);
    setLoadingImage(false);
  }
  console.log(selectCategory);
  async function handleAddCategory() {
    if (!name) return toast.error("name is required");
    if ( !price ) return toast.error( "price is required" );
    if (!description) return toast.error("description is required");
    if (!selectCategory) return toast.error("category is required");
    if (!uploadImage) return toast.error("img is required");
    setLoading(true);
    let obj = {
      name: name,
      price: price,
      description:description,
      categoryId: selectCategory.id,
      categoryName: selectCategory.name,
      img: uploadImage,
    };

    const refCat = collection(db, "category", selectCategory.id, "product");
    await addDoc(refCat, obj);
    setLoading(false);
    setUploadImage("");
    toast.success("add product successfully");
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto min-h-72 p-3 translate-y-[15%]">
      <div>
        <HeaderTable navigateTo={"-1"} name={"back"} title={"Add Product"} />
      </div>
      <div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="border border-slate-300 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">Price</label>
          <input
            type="text"
            className="border border-slate-300 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">description</label>
          <textarea
           
            className="border border-slate-300 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">category</label>
          <select
            onChange={(e) =>
              setSelectCategory(
                category.find((cat) => cat.id === e.target.value)
              )
            }
            className="border border-slate-300 outline-none rounded-md py-1 px-2 placeholder:text-[14px]"
          >
            <option value="">select category</option>
            {category &&
              category.map((e, i) => (
                <option value={e.id} key={i}>
                  {e?.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="imagecategory" className="cursor-pointer">
            Image
            <p className="border border-primaryDashboard p-1 rounded-lg mt-2">
              {loadingImage ? "Loading..." : "upload Image"}
            </p>
          </label>
          <input
            id="imagecategory"
            type="file"
            onChange={handleUploadImage}
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px] hidden"
          />
        </div>
        <div>
          <button
            onClick={handleAddCategory}
            disabled={loadingImage}
            className="bg-buttonDashboard w-full mt-3 rounded-md p-1 duration-150 transition-all text-white font-semibold bg-purple-700"
          >
            {loading ? "Loading..." : "  Add product"}
          </button>
        </div>
      </div>
    </div>
  );
}
