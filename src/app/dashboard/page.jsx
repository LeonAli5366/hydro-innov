"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";

const Page = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined!");
  }

  // Fetch products directly inside the component
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/dashboard/product`);
        const jsonData = await res.json();

        if (jsonData.status === "Success") {
          setProductData(jsonData.data); // Set product data if successful
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again later."); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProducts();
  }, [apiUrl]);

  // Render loading state, error state, or product data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {productData.length > 0 ? (
          productData.map(({ id, title, subTitle, photo }) => (
            <Link href={`/dashboard/${id}`} key={id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{subTitle}</p>
                  <div className="w-full h-48 mt-3">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={title}
                        className="w-full h-full object-cover rounded"
                        width={500}
                        height={500}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                        <span className="text-gray-500">
                          No Image Available
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <DataTable />
    </div>
  );
};

export default Page;
