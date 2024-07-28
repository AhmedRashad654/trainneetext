"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ContextUser } from "../../../context/ContextSendMessage";
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const { auth } = useContext(ContextUser);
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    if (!email || !password)
      return toast.error("Email and Password is required");
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result?.user?.accessToken) {
          toast.success("login successfully");
          router.push("/");
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Email or Password is wrong");
        } else {
          toast.error(error.code);
        }
      });
    setLoading(false);
  }
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="w-full bg-main h-[calc(85vh)] rounded-br-[25%] relative p-5 text-white">
        <div className="flex items-center gap-2 translate-y-2">
          <FaArrowLeftLong
            size={25}
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <h1 className=" text-[1.5rem] font-bold">Login</h1>
        </div>
        <div className="absolute top-[50%] translate-y-[-50%] flex flex-col gap-7 pr-10">
          <div className="space-y-2">
            <h2 className="text-[1.3rem] font-bold">Login By Eamil</h2>
            <p className="text-[0.8rem] text-gray-200">
              Enter The Email and Password
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              className="outline-none  border-l-0 border-r-0 border-t-0 bg-transparent text-gray-200 py-3 border border-b-1 border-gray-200"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="outline-none  border-l-0 border-r-0 border-t-0 bg-transparent text-gray-200 py-3 border border-b-1 border-gray-200"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="absolute -bottom-[15px]  min-w-[200px] w-[20%] text-center text-black transition-all duration-200 p-[5px] hover:bg-yellow-500 cursor-pointer rounded-full text-[1rem] font-bold bg-yellow-400 left-[50%] translate-x-[-50%]">
          <button onClick={handleLogin}>
            {loading ? "Loading..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </>
  );
}
