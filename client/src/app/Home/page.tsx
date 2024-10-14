"use client";
import React, { Suspense, useState, useEffect } from "react";
import Banner from "@/components/Home/Banner";
import Brands from "@/components/Home/Brands";
import Categories from "@/components/Home/Categories";
import CategoryProducts from "@/components/Home/CategoryProducts";
import FooterLinks from "@/components/Home/FooterLinks";
import Information from "@/components/Home/Information";
import Quote from "@/components/Home/Quote";
import Recommendation from "@/components/Home/Recommendation";
import SellInformation from "@/components/Home/SellInformation";
import Testimonials from "@/components/Home/Testimonials";
import { Snackbar } from "@mui/material";
import { useSearchParams } from "next/navigation";

function PageContent() {
  const searchParams = useSearchParams();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authorizedParam = searchParams.get("authorized");
      if (authorizedParam === "true" || authorizedParam === null) {
        setShowSnackbar(false);
      } else {
        setShowSnackbar(true);
        setMessage("Login/Signup to access seller tools");
      }
    }
  }, [searchParams]);

  const categories = [
    { name: "Building & Construction", image: "/construction.png" },
    { name: "Electronics & Electrical", image: "/electronics.png" },
    { name: "Drugs & Pharma", image: "/pharma.png" },
    { name: "Industrial Supplies", image: "/industry.png" },
    { name: "Food & Agriculture", image: "/food.png" },
    { name: "Home Supplies", image: "/home.png" },
  ];

  return (
    <div className="w-full flex flex-col h-auto items-center">
      <title>Home Page | Source Arabia</title>
      <meta
        name="description"
        content="Welcome to the Source Arabia, buy products in stock"
      />
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={6000}
        message={Message}
      />
      <Banner />
      <Categories fetchCategories={() => {}} categories={categories} />
      <Recommendation />
      <Quote />
      <CategoryProducts />
      <Brands product={false} />
      <Information />
      <Testimonials />
      <SellInformation />
      <FooterLinks />
    </div>
  );
}

// Wrap PageContent with Suspense to handle CSR
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
