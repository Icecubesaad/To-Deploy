"use client";
import React, { useState, useEffect } from "react";
import RecommendationCard from "../Cards/RecommendationCard";
import "./Home.css";
import { CircularProgress } from "@mui/material";
import { Product } from "@/utils/types";

function Recommendation() {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommend = async () => {
    setLoading(true);
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/get/getRecommendedProduct`,
        {
          method: "GET",
        },
      );
      const response = await request.json();
      console.log(response);
      if (response.success) {
        setRecommendedProducts(response.products);
      } else {
        setRecommendedProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(`Failed to fetch recommendations: ${error}`);
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  return (
    <div className="w-[90%] md:w-[80%] h-[auto]">
      <h1 className="text-[#404145] roboto text-4xl mt-10 text-center">
        Feature Recommendations
      </h1>

      {loading ? (
        <div className="flex w-full justify-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : recommendedProducts.length > 0 ? (
        <div className="grid grid-cols-2 grid-rows-4 gap-x-3 gap-y-10 items-center w-full md:grid md:grid-cols-4 md:grid-rows-2 md:gap-x-8 mt-10 justify-items-center">
          {recommendedProducts.map((product: Product, index: number) => (
            <RecommendationCard
              key={`recommend-${index}`}
              title={product.title}
              price={product.mrp}
              image={product.images[0]}
              uniqueId={product._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">No recommendations available</div>
      )}
    </div>
  );
}

export default Recommendation;
