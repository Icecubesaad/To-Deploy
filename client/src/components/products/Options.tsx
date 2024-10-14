'use client'
import React,{useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
function Options() {
  const countries = [
    "All Result",
    "New York",
    "California",
    "Dubai",
    "Melbourne",
    "Riyadh",
    "Dammam",
    "Florida",
  ];
  const [selected, setselected] = useState("All Result");
  return (
    <div className=" h-[100px] w-full justify-center flex  gap-5">
      <div className=" h-full w-[80%] flex items-center justify-between">
        <div className=" md:flex w-[30%] h-[50px] hidden flex-row items-center rounded-lg border-[1px] border-transparent bg-[#E9E9E9] gap-3 pl-3 pr-3">
          <LocationOnIcon />
          <input
            placeholder="Search By City"
            className=" bg-transparent w-[90%] h-full outline-none placeholder:text-black text-black macan font-[600]"
          />
          <MyLocationIcon />
        </div>
        <div className="w-full h-full flex items-center justify-end">
          <div className="flex flex-row h-[50px] w-full gap-3 items-center overflow-x-auto whitespace-nowrap md:overflow-hidden md:justify-end">
            {countries.map((e: string, index: number) => {
              return (
                <button
                  key={`product-option-${index}`}
                  onClick={()=>{setselected(e)}}
                  className={`w-auto p-2 h-[40px] border-[#A0A0A099] ${selected==e?"bg-[#148444] text-white":"bg-white text-black"} border-[1px] rounded-3xl`}
                >
                  <p className=" helve font-[500]">{e}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
