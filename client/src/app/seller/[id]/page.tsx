"use client";
import Banner from "@/components/Seller/Banner";
import Main from "@/components/Seller/Main";
import React from "react";
import FooterLinks from "@/components/Home/FooterLinks";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter()
  const params = useParams();
  const id = params?.id || [];
  const [details, setdetails] = useState<any>();
  const [loading, setloading] = useState(true);
  const fetchSeller = async () => {
    try {
      setloading(true);
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getSellerInformation/${id}`,
        {
          method: "GET",
        }
      );
      const response = await request.json();
      if (response.success) {
        setdetails(response.data);
        setloading(false);
      } else {
        router.push('/404')
      }
    } catch (error) {
      router.push('/404')
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSeller();
  }, []);

  return (
    <div className=" w-full h-auto flex flex-col items-center">
      <title>{details? `${details.name} | Source Arabia`:'seller' }</title>
      <meta name="description" content={details? details.details : 'details'} />
      {loading ? (
        <div className=" flex w-full h-screen justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Banner details={details} />
          <Main details={details} />
        </>
      )}
      <FooterLinks />
    </div>
  );
}

export default Page;
