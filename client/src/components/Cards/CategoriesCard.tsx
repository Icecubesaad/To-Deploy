"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./cardsStyle.css";
function CategoriesCard({
  title,
  image,
  selectedCategory,
  setselectedCategory,
  fetchCategories
}: {
  title: string;
  image: string;
  setselectedCategory?: any;
  selectedCategory?: any;
  fetchCategories?:any
}) {
  const [isClient, setIsClient] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setIsClient(true);
    setPathname(window.location.pathname);
  }, []);

  const isSellerPage = pathname.includes("seller");

  const handleClick = async () => {
    if (isSellerPage) {
      // Do nothing as the button is disabled
      return;
    }
    if(typeof window !== 'undefined')
      {
      // Your client-side code that uses window goes here
      if (pathname.includes("Home")) {
        window.location.href = `/products/${title}/All Categories`;
      } else if (pathname.includes("products")) {
        const currentUrl = window.location.href;
        let newUrl = currentUrl.split('/').slice(0, -1).join('/') + `/${title}/All Categories`;
        window.location.href = newUrl;
        fetchCategories()
      }
      }
  };

  return (
    <button
      className={`md:h-[80%] h-full pt-5 pb-5 md:pt-0 md:pb-0 pl-4 w-full flex flex-col justify-center border-transparent border-[1px] rounded-xl shadow-card gap-2 ${
        isSellerPage
          ? "bg-white text-black"
          : selectedCategory == title
          ? "bg-[#404145] text-white"
          : "bg-white text-[#333333]"
      }`}
      onClick={() => {
        if (!isSellerPage) {
          setselectedCategory(title);
          handleClick();
        }
      }}
      disabled={isSellerPage}
    >
      <Image
        src={image}
        alt="image"
        height={50}
        width={50}
        style={{
          filter: selectedCategory == title ? "invert(100%)" : "invert(0%)", // Inverts colors for selected item
        }}
      />
      <p
        className={`roboto font-[700] text-md text-start ${
          isSellerPage
            ? "text-black"
            : selectedCategory == title
            ? "text-white"
            : "text-[#333333]"
        }`}
      >
        {title}
      </p>
    </button>
  );
}

export default CategoriesCard;
