"use client";
import React, { useContext } from "react";
import HeaderTable from "../../@header/page";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../config";
import Image from "next/image";
import swal from "sweetalert";
import { ContextUser } from "../../../../../context/ContextSendMessage";
export default function ProductDashboard() {
  const router = useRouter();
  const { product } = useContext(ContextUser);

  //////////delete Category////////

  async function handleDelete(pro) {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (del) => {
      if (del) {
        try {
          const refTodo = doc(
            db,
            "category",
            pro.categoryId,
            "product",
            pro.id
          );
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
          navigateTo={"/dashboard/addproduct"}
          name={"Add New"}
          title={"Product Table"}
        />
      </div>
      <div className="relative overflow-x-auto  scrollbar overflow-y-auto h-[380px]">
        <table className="w-full text-sm  text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3 text-start">Name</th>
              <th className="px-6 py-3 text-start">category</th>
              <th className="px-6 py-3 text-start">price</th>
              <th className="px-6 py-3 text-start">image</th>

              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.map((pro, index) => (
                <tr
                  key={index}
                  className="odd:bg-white  even:bg-gray-50  border-b "
                >
                  <td className="px-6 py-4">{pro.name}</td>
                  <td className="px-6 py-4">{pro.categoryName}</td>
                  <td className="px-6 py-4">{pro.price}</td>
                  <td className="px-6 py-4">
                    <Image src={pro.img} alt="product" width={50} height={50} />
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="font-medium text-red-600 "
                      onClick={() => handleDelete(pro)}
                    >
                      delete
                    </button>
                    <button
                      className="font-medium text-blue-600 "
                      onClick={() =>
                        router.push(
                          `/dashboard/updateproduct?name=${pro.name}&&img=${pro.img}&&id=${pro.id}&&price=${pro.price}&&catId=${pro.categoryId}`
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
