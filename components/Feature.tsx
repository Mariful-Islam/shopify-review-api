import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

function Feature() {
  const items = [
    {
      icon: <MdOutlineSecurity className="text-blue-500 h-12 w-12" />,
      title: "Highly Secured",
      description:
        "APIs are secured with api secret key. So review data are protected.",
    },
    {
      icon: <AiOutlineThunderbolt className="text-blue-500 h-12 w-12" />,
      title: "Blazing Fast and Optimized",
      description: "APIs are fast and highly optimized, ",
    },
    {
      icon: <FaRegSmile className="text-blue-500 h-12 w-12" />,
      title: "User Friendly",
      description:
        "Designed with developers in mind, providing an easy and clean integration experience.",
    },
  ];
  return (
    <div className="px-6 py-12" id="feature">
      <h2 className="text-xl font-bold">Features</h2>

      <div className="grid grid-cols-3 gap-6 justify-between items-center mt-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 justify-center items-center border border-gray-200 rounded-xl p-8 h-full text-center"
          >
            <div>{item.icon}</div>
            <h1 className="text-2xl ">{item.title}</h1>
            <div className="text-gray-500">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
