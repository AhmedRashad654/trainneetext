import Image from "next/image";
import BackHeader from "../../public/assets/pngtree-digital-retailing-illustration-laptop-keyboard-with-shopping-basket-and-e-commerce-image_3903657.jpg";
import Navbar from "./_componant/Navbar";
import HeaderCategory from "./_componant/HeaderCategory";
import Products from "./_componant/Product";
import Footer from "./_componant/Footer";
export default function Home() {
  return (
    <>
      <div className="w-full h-screen relative">
        <Navbar />
        <Image src={BackHeader} alt="background" className="w-full h-full" />
        <div className="absolute top-[50%] translate-y-[-50%] left-10">
          <div className="p-1 -space-y-8 mainHead">
            <h1 className="text-[5rem] font-bold text-white">FOOD</h1>
            <h2 className="text-[4.5rem] font-bold text-white">MOOD</h2>
          </div>
          <div className="max-w-[550px] text-white font-normal pr-3 insidetext">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            fuga aspernatur commodi facere labore architecto quod consequuntur,
            neque, repellendus officiis repellat fugiat perferendis illo
            voluptates, accusamus illum impedit temporibus esse?
          </div>
        </div>
      </div>
      <HeaderCategory />
      <Products />
      <Footer />
    </>
  );
}
