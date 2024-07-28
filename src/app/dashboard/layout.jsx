import { ToastContainer } from "react-toastify";
import SideBarDashboard from "./@sidebar/page";

export default function RootLayout({ children }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <div>
        <div className="">
          <div>
            <SideBarDashboard />
          </div>
          <div className="w-[85%] smm:w-[calc(100%-40px)] ml-[15%] smm:ml-[40px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
