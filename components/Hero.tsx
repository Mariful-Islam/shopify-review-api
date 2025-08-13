import Image from "next/image";
import React from "react";
import star from "@/assets/star.svg";
import scr1 from "@/assets/Screenshot from 2025-08-13 15-10-03.png";
import scr2 from "@/assets/Screenshot from 2025-08-13 15-11-05.png";

function Hero() {
  return (
    <div className="h-[500px] flex justify-center items-center text-start px-6 relative">

      <div className="w-1/2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          Convert Your <span className="text-blue-500">Customers</span> with Our{" "}
          <span className="text-blue-500">Product Review API</span>{" "}
        </h1>
        <div className="mt-6">By Brandify Digital Team</div>
      </div>

      <div className="flex w-1/2 ">
        <Image src={scr2} alt="" className="h-[400px] w-[400px] object-cover" />
        {/* <Image src={scr2} alt='' /> */}
      </div>
    </div>
  );
}

export default Hero;
