import Image from "next/image";
import React from "react";
import star from "@/assets/star.svg";
import scr1 from "@/assets/Screenshot from 2025-08-18 11-38-28.png";
import scr2 from "@/assets/Screenshot from 2025-08-18 11-39-00.png";
import scr3 from "@/assets/Screenshot from 2025-08-18 11-40-14.png";
import scr4 from "@/assets/Screenshot from 2025-08-18 11-40-19.png"

import Carousel from "./Carousel";

function Hero() {

  const items = [
    scr1, scr2, scr3, scr4
  ]


  return (
    <div className="h-[500px] flex justify-center items-center gap-6 text-start px-6 relative">

      <div className="w-1/2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          Convert Your <span className="text-blue-500">Customers</span> with Our{" "}
          <span className="text-blue-500">Product Review API</span>{" "}
        </h1>
        <div className="mt-6">By Brandify Digital Team</div>
      </div>

      <div className="flex w-1/2 ">
        <Carousel images={items} />
      </div>
    </div>
  );
}

export default Hero;
