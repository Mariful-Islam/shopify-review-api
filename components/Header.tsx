import React from "react";

function Header() {
  return (
    <nav className="flex flex-col items-center gap-6 sm:gap-0 sm:flex-row justify-between py-6 px-8 ">
      <h2 className="font-bold text-2xl">Shopify Product Review</h2>
      <div>
        <ul className="flex gap-8 text-gray-600">
          <li>
            <a href="#docs">Docs</a>
          </li>
          <li>
            <a href="#feature">Feature</a>
          </li>
          <li>
            <a href="#about-us">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
