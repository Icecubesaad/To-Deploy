"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import EastIcon from "@mui/icons-material/East";
interface information {
  logo: string;
  title: string;
  desc: string;
  link: string;
  path: string;
  selected: any;
  setselected: any;
  uniqueKey: number;
}
function InformationCards({
  title,
  desc,
  logo,
  link,
  path,
  selected,
  setselected,
  uniqueKey,
}: information) {
  const changeSelectedStart = (unique: number) => {
    setselected(unique);
  };
  return (
    <div
      onMouseEnter={() => {
        changeSelectedStart(uniqueKey);
      }}
      onMouseLeave={()=>{
        changeSelectedStart(-1)
      }}
      className="  w-[240px]  items-center h-[350px] p-2 border-[1px] border-transparent rounded-xl flex flex-col gap-4 pt-10"
      style={
        selected == uniqueKey
          ? { backgroundColor: "#013A12", transition:"all 300ms" }
          : { backgroundColor: "#F2F3F5", transition:"all 300ms" }
      }
    >
      <div className=" w-[50px] h-[50px]">
        <Image
          src={logo}
          alt="image"
          width={50}
          height={50}
          style={{
            filter: selected === uniqueKey ? "invert(100%)" : "invert(0%)", // Inverts colors for selected item
          }}
        />
      </div>
      <p
        style={selected == uniqueKey ? { color: "white" } : { color: "black" }}
        className=" w-[70%] text-center font-[700] roboto text-lg mt-3"
      >
        {title}
      </p>
      <p
        style={selected == uniqueKey ? { color: "white" } : { color: "black" }}
        className=" w-[80%] text-center text-sm "
      >
        {desc}
      </p>
      <Link href={path} className=" mt-3">
        <p
          style={
            selected == uniqueKey ? { color: "white" } : { color: "#013A12" }
          }
          className=" roboto font-[700]"
        >
          {link} <EastIcon sx={selected==uniqueKey?{color:"white"}:{ color: "#013A12" }} />
        </p>
      </Link>
    </div>
  );
}

export default InformationCards;
