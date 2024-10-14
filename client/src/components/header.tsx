"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { SignUp, Login, logout } from "@/modules/auth";
function Header() {
  const [windowWidth, setWindowWidth] = useState(701); // Initialize with 0 or another value that doesn't rely on `window`

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Your client-side code that uses window goes here
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    // Set the initial window width when the component mounts

    // Cleanup the event listener on component unmount
  }, []);
  function openSidebar(): void {
    const sidebar = document.getElementById("sidebar") as HTMLElement | null;
    if (sidebar) {
      sidebar.classList.add("active");
      sidebar.style.animation = "openSidebar 500ms forwards";
    }
  }

  function closeSidebar(): void {
    const sidebar = document.getElementById("sidebar") as HTMLElement | null;
    if (sidebar) {
      sidebar.classList.remove("active");
      sidebar.style.animation = "closeSidebar 500ms forwards";
    }
  }

  const [authorized, setauthorized] = useState<boolean>(false);
  const getUser = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      if (!data.error) {
        setauthorized(true);
      } else {
        setauthorized(false);
      }
    } catch (err) {
      setauthorized(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="flex flex-row w-full h-[11vh] items-center justify-center">
      <div className="w-[90%]  flex flex-row justify-center items-center">
        <Link href="/Home" className=" w-full md:w-[60%]">
          <Image src="/logo.png" alt="logo" width={200} height={150} />
        </Link>
        {windowWidth < 700 ? (
          <div className=" w-full h-full ">
            <button onClick={openSidebar} className=" w-full flex justify-end">
              <MenuIcon sx={{ fontSize: 40 }} />
            </button>
            <div
              id="sidebar"
              className=" w-full h-screen bg-[#013A12] mobile-sidebar p-10"
            >
              <button
                onClick={closeSidebar}
                className=" w-full flex justify-end"
              >
                <MenuIcon sx={{ color: "white", fontSize: 40 }} />
              </button>
              <div className="flex mt-10 flex-col items-start w-full gap-10">
                <Link
                  onClick={closeSidebar}
                  href="/Home"
                  className=" text-white flex flex-row justify-center items-center gap-4"
                >
                  <Image
                    src="/allCategories.png"
                    width={30}
                    height={30}
                    alt="image"
                    className=" filter brightness-100 "
                  />
                  <p className="helve text-white text-xl font-[500]">
                    All Categories
                  </p>
                </Link>
                <Link href="#" onClick={closeSidebar}>
                  <p className="text-center text-white text-xl helve font-[500]">
                    Shopping
                  </p>
                </Link>
                <Link href="/sellerTools" onClick={closeSidebar}>
                  <p className="text-center text-white text-xl helve font-[500]">
                    Seller Tool
                  </p>
                </Link>
                <Link href="#" onClick={closeSidebar}>
                  <p className="text-center text-white text-xl helve font-[500]">
                    Message
                  </p>
                </Link>
                {!authorized ? (
                  <>
                    <button
                      onClick={Login}
                      className=" bg-[#404145] w-full text-white border-[1px] rounded-xl border-transparent "
                    >
                      <div className="w-full bg-white p-3 flex flex-row text-black rounded-xl justify-center text-base helve font-[700]">
                        Signin
                      </div>
                    </button>
                    <button
                      onClick={SignUp}
                      className=" bg-[#404145] w-full text-white border-[1px] rounded-xl border-transparent"
                    >
                      <div className="w-full rounded-xl  p-3 flex flex-row justify-center helve text-base font-[700]">
                        Join us
                      </div>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className=" bg-[#404145] w-full text-white border-[1px] rounded-xl border-transparent"
                  >
                    <div className="w-[100px] p-3 flex flex-row justify-center helve text-base font-[700]">
                      Log out
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-end items-center w-full gap-7">
            <Link
              href="/Home"
              className=" flex flex-row justify-center items-center gap-2"
            >
              <Image
                src="/allCategories.png"
                width={15}
                height={15}
                alt="image"
              />
              <p className="helve text-base font-[500]">All Categories</p>
            </Link>
            <Link href="#">
              <p className="text-center text-base helve font-[500]">Shopping</p>
            </Link>
            <Link href="/sellerTools">
              <p className="text-center text-base helve font-[500]">
                Seller Tool
              </p>
            </Link>
            <Link href="#">
              <p className="text-center text-base helve font-[500]">Message</p>
            </Link>
            {!authorized ? (
              <>
                <button
                  onClick={Login}
                  className=" bg-[#013A12] text-white border-[1px] rounded-xl border-transparent "
                >
                  <div className="w-[100px] p-3 flex flex-row justify-center text-base helve font-[700]">
                    Signin
                  </div>
                </button>
                <button
                  onClick={SignUp}
                  className=" bg-[#404145] text-white border-[1px] rounded-xl border-transparent w-[100px]"
                >
                  <div className="w-[100px] p-3 flex flex-row justify-center helve text-base font-[700]">
                    Join us
                  </div>
                </button>
              </>
            ) : (
              <button
                onClick={logout}
                className=" bg-[#404145] text-white border-[1px] rounded-xl border-transparent w-[100px]"
              >
                <div className="w-[100px] p-3 flex flex-row justify-center helve text-base font-[700]">
                  Log out
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
