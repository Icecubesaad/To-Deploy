"use client";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TestimonialsCard from "../Cards/TestimonialsCard";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
interface testimonials {
  name: string;
  image: string;
  rating: number;
  desc: string;
}
function Testimonials() {
  const [selected, setselected] = useState<number | any>("");
  const testimonialsDummy: testimonials[] = [
    {
      rating: 5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt",
      name: "Former Intern",
      image: "/people/person.png",
    },
    {
      rating: 5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt",
      name: "Former Intern",
      image: "/people/person.png",
    },
    {
      rating: 5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt",
      name: "Former Intern",
      image: "/people/person.png",
    },
    {
      rating: 5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt",
      name: "Former Intern",
      image: "/people/person.png",
    },
    {
      rating: 5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt",
      name: "Former Intern",
      image: "/people/person.png",
    },
    {
      rating: 5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt",
      name: "Former Intern",
      image: "/people/person.png",
    },
  ];
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [testimonialArray, settestimonialArray] = useState(testimonialsDummy.slice(start, end));

  useEffect(() => {
    settestimonialArray(testimonialsDummy.slice(start, end));
  }, [start, end]);

  const nextPage = () => {
    setStart((prev) => prev + 3);
    setEnd((prev) => prev + 3);
  };

  const prePage = () => {
    setStart((prev) => Math.max(prev - 3, 0));  // Ensure start doesn't go below 0
    setEnd((prev) => Math.max(prev - 3, 3));    // Ensure end doesn't go below 3
  };
  return (
    <div
      className="w-[90%] bg-[#148444] pb-10 md:pb-0 h-auto  md:h-[110vh] border-[1px] rounded-2xl border-transparent flex flex-col  items-center md:relative md:top-[-200px] pt-16 mt-5 md:mt-32"
    >
      <div className="w-[90%] flex flex-col md:flex-row justify-between">
        <div className=" flex flex-row md:gap-5 justify-between">
          <div>
            <Image src="/testimonial.png" alt=".." width={100} height={100} />
          </div>
          <div className=" flex flex-col">
            <h1 className="macan text-xl md:text-3xl text-white">Testimonials</h1>
            <h1 className="macan text-xl md:text-3xl text-white">
              Seller Success Stories
            </h1>
          </div>
        </div>
        <div className=" flex flex-row gap-3 md:justify-start justify-center items-center">
          <button className=" w-auto h-[40px] bg-[#013A12] border-[1px] border-transparent rounded-[10px] pl-4 pr-4 text-white">
            View All Stories
          </button>
          <div className=" flex flex-row gap-5">
          <button
              disabled={start <= 0}
              onClick={prePage}
              className="p-2 border-black hover:bg-black hover:text-white h-[40px] w-[40px] bg-transparent border-[1px] rounded-lg flex justify-center items-center"
            >
              {start<=0?<DoDisturbIcon/>:<ArrowBackIosIcon />}
            </button>
            <button
              disabled={end >= testimonialsDummy.length}
              onClick={nextPage}
              className="p-2 border-black h-[40px] w-[40px] hover:bg-black hover:text-white bg-transparent border-[1px] rounded-lg flex justify-center items-center"
            >
             {end>=testimonialsDummy.length?<DoDisturbIcon/>: <ArrowForwardIosIcon  />}
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-10 items-center md:items-start md:flex-row justify-between w-[90%] mt-5">
        {testimonialArray.map((testimonial: testimonials, index: number) => {
          return (
            <TestimonialsCard
              key={`testimonial-${index}`}
              name={testimonial.name}
              desc={testimonial.desc}
              image={testimonial.image}
              rating={testimonial.rating}
              selected={selected}
              setselected={setselected}
              uniquekey={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Testimonials;
