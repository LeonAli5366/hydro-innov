"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const getAllProduct = async () => {
  const res = await fetch("http://localhost:3000/api/dashboard/product");
  const jsonData = await res.json();
  if (jsonData.status === "Success") {
    return jsonData.data; 
  }
  throw new Error("Failed to fetch products");
};

const Products = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {productData.length > 0 ? (
        productData.map((product) => (
          <Link href={`/dashboard/products/${product.id}`} key={product.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.subTitle}</p>
                {product.photo ? (
                  <Image
                    src={product.photo}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded mt-3"
                    width={500}
                    height={500}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mt-3">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Products;
