import React from "react";
import { FaGithub } from "react-icons/fa";

function Header() {
  return (
    <nav className="flex flex-col items-center gap-6 sm:gap-0 sm:flex-row justify-between py-6 px-8 ">
      <h2 className="font-bold text-2xl">Shopify Product Review</h2>
      <div>
        <ul className="flex gap-8 text-gray-500  duration-150">
          <li>
            <a href="#docs" className="hover:text-black">Docs</a>
          </li>
          <li>
            <a href="#feature" className="hover:text-black">Feature</a>
          </li>
          <li>
            <a href="#about-us" className="hover:text-black">About</a>
          </li>
          <li className="flex items-center">
            <a href="https://github.com/Mariful-Islam/shopify-review-api" target="_blank" className="hover:text-black"><FaGithub /></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
