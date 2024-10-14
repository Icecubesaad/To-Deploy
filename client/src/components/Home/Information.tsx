"use client";
import React, { useState } from "react";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InformationCards from "../Cards/InformationCards";

interface information {
  logo: string;
  title: string;
  desc: string;
  link: string;
  path: string;
}

function Information() {
  const [selected, setselected] = useState<number | any>("");
  const InformationCardsDummy: information[] = [
    {
      logo: "/information/seller.png",
      title: "Connect with verified sellers",
      desc: "Tell us your requirement & let our experts find verified sellers for you",
      link: "Get Verified Seller",
      path: "#",
    },
    {
      logo: "/information/startSelling.png",
      title: "Sell on Source Arabia for Free",
      desc: "Tell us your requirement & let our experts find verified sellers for you",
      link: "Start Selling",
      path: "#",
    },
    {
      logo: "/information/mobileApp.png",
      title: "Download Our Mobile App",
      desc: "Tell us your requirement & let our experts find verified sellers for you",
      link: "Download Now",
      path: "#",
    },
    {
      logo: "/information/tally.png",
      title: "Tally verigied sellers on Mobile",
      desc: "Tell us your requirement & let our experts find verified sellers for you",
      link: "Get Verified Seller",
      path: "#",
    },
  ];
  return (
    <div className="w-[90%] bg-white h-auto md:h-[500px] border-[1px] rounded-2xl border-transparent  md:flex md:flex-col  md:items-center relative top-[-200px] pt-20">
      <div className=" w-full flex flex-col items-center gap-5">
        <p className="macan text-center font-[500] text-[#404145] text-3xl">
          More Information For You
        </p>
        <div className=" flex flex-col md:flex-row items-center gap-5  w-[90%] justify-between mt-5">
          {InformationCardsDummy.map(
            (information: information, index: number) => {
              return (
                <InformationCards
                  key={`information-${index}`}
                  logo={information.logo}
                  title={information.title}
                  desc={information.desc}
                  link={information.link}
                  path={information.path}
                  selected={selected}
                  setselected={setselected}
                  uniqueKey={index}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Information;
