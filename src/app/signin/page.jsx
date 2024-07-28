"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

import { ContextUser } from "../../../context/ContextSendMessage";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function SignIn() {
  const { auth } = useContext(ContextUser);
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  async function handleRegister(e) {
    e.preventDefault();
    if (!email || !password)
      return toast.error("Email and Password is required");
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result?.user) {
          toast.success("create user successfully");
          router.push("/login");
        }
      })
      .catch((error) => toast.error(error.code));
    setLoading(false);
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="w-full bg-main h-[calc(85vh)] rounded-br-[25%] relative p-5 text-white">
        <h1 className="p-1 translate-y-2  text-[1.5rem] font-bold">Sign In</h1>
        <div className="absolute top-[50%] translate-y-[-60%] flex flex-col gap-7 pr-10">
          <div className="space-y-2">
            <h2 className="text-[1.3rem] font-bold">Welcome!</h2>
            <p className="text-[0.8rem] text-gray-200">
              Please Enter Your Email ,Password to continue using our app
            </p>
          </div>

          <input
            type="email"
            className="outline-none  border-l-0 border-r-0 border-t-0 bg-transparent text-gray-200 py-3 border border-b-1 border-gray-200"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="outline-none  border-l-0 border-r-0 border-t-0 bg-transparent text-gray-200 py-3 border border-b-1 border-gray-200"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="absolute -bottom-[15px]  min-w-[200px] w-[20%] text-center text-black transition-all duration-200 p-[5px] hover:bg-yellow-500 cursor-pointer rounded-full text-[1rem] font-bold bg-yellow-400 left-[50%] translate-x-[-50%]">
          <button onClick={handleRegister}>
            {loading ? "Loading..." : "NEXT"}
          </button>
        </div>
        <p className="text-[12px] ml-2 mt-1">
          Already have email ? <span className="text-red-300 cursor-pointer" onClick={()=>router.push("/login")}>Login</span>
        </p>
      </div>
    </>
  );
}
