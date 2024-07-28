"use client";
import React, { useContext, useEffect } from "react";
import HeaderTable from "../../@header/page";
import { useRouter } from "next/navigation";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../config";
import Image from "next/image";
import swal from "sweetalert";
import { ContextUser } from "../../../../../context/ContextSendMessage";
export default function CategoryDashboard() {
  const router = useRouter();
  const { category } = useContext(ContextUser);
  console.log(category);
  async function handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (del) => {
      if (del) {
        try {
          const refTodo = doc(db, "category", id);
          await deleteDoc(refTodo);
          swal("Deleted successfully", {
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          swal(error.message, {
            icon: "error",
          });
        }
      }
    });
  }

  return (
    <div className="w-[95%] mx-auto translate-y-[15%] min-h-96">
      <div>
        <HeaderTable
          navigateTo={"/dashboard/addCategory"}
          name={"Add New"}
          title={"Category Table"}
        />
      </div>
      <div className="relative overflow-x-auto  scrollbar overflow-y-auto h-[380px]">
        <table className="w-full text-sm  text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3 text-start">Name</th>
              <th className="px-6 py-3 text-start">Image</th>
              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {category &&
              category.map((cat, index) => (
                <tr
                  key={index}
                  className="odd:bg-white  even:bg-gray-50  border-b "
                >
                  <td className="px-6 py-4">{cat.name}</td>
                  <td className="px-6 py-4">
                    <Image
                      src={cat.img}
                      alt="category"
                      width={50}
                      height={50}
                    />
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="font-medium text-red-600 "
                      onClick={() => handleDelete(cat.id)}
                    >
                      delete
                    </button>
                    <button
                      className="font-medium text-blue-600 "
                      onClick={() =>
                        router.push(
                          `/dashboard/updateCategory?name=${cat.name}&&img=${cat.img}&&id=${cat.id}`
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
