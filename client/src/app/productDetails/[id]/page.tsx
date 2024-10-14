"use client";
import Details from "@/components/productDetails/Details";
import React from "react";
import Main from "@/components/productDetails/Main";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter()
  const params = useParams();
  const id = params?.id || [];
  const [productDetails, setproductDetails] = useState<any>();
  const [loading, setloading] = useState(true);
  
  
  // to fetch the product
  const fetchproduct = async () => {
    try {
      setloading(true);
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getSingleProduct/${id}`,
        {
          method: "GET",
        }
      );
      const response = await request.json();
      if (response.success) {
        setproductDetails(response.data);
        setloading(false);
      } else {
        setproductDetails({});
        router.push('/404')
      }
    } catch (error) {
      router.push('/404')
    }
  };
  useEffect(() => {
    fetchproduct();
  }, []);
  return (
    <div className=" w-full flex flex-col items-center">
      <title>{productDetails? productDetails.title :'product details'}</title>
      <meta name="description" content={productDetails ? productDetails.description : 'product'} />
      {loading ? (
        <div className=" flex w-full h-screen justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Details product={productDetails} />
          <div className=" w-full mt-10 bg-[#F2F3F5] h-auto flex justify-center">
            <Main details={productDetails} />
          </div>
        </>
      )}
    </div>
  );
}

export default Page;