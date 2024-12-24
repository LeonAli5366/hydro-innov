"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    title: "",
    subTitle: "",
    photo: "",
    pageId: "1", 
  });
  const [photoFile, setPhotoFile] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined!");
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/dashboard/product`);
        const jsonData = await res.json();

        if (jsonData.status === "Success") {
          setProductData(jsonData.data);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);

      let photoUrl = "";
      if (photoFile) {
        // Example upload logic, replace with your actual implementation
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("upload_preset", "estate");

        const uploadRes = await fetch("https://api.cloudinary.com/v1_1/dgupi3gce/image/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        photoUrl = uploadData?.secure_url;
      }

      const newProduct = {
        title: newProductData.title,
        subTitle: newProductData.subTitle,
        photo: photoUrl,
        pageId: parseInt(newProductData.pageId),
      };

      const res = await fetch(`${apiUrl}/api/dashboard/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const json = await res.json();

      if (json.status === "Success") {
        alert("Product created successfully.");
        setIsModalOpen(false);
        setNewProductData({ title: "", subTitle: "", photo: "", pageId: "1" });
        setPhotoFile(null);
        setProductData((prev) => [...prev, json.data]); // Add the new product to the list
      } else {
        throw new Error(json.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create the product.");
    } finally {
      setLoading(false);
    }
  };

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
      <Button onClick={() => setIsModalOpen(true)} variant="primary">
        Create New Product
      </Button>

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
                        <span className="text-gray-500">No Image Available</span>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">Create New Product</h2>
            <Input
              name="title"
              value={newProductData.title}
              onChange={(e) =>
                setNewProductData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Title"
              className="mb-4"
            />
            <Input
              name="subTitle"
              value={newProductData.subTitle}
              onChange={(e) =>
                setNewProductData((prev) => ({ ...prev, subTitle: e.target.value }))
              }
              placeholder="Subtitle"
              className="mb-4"
            />
            <Input
              type="file"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="mb-4"
            />
            <select
              name="pageId"
              value={newProductData.pageId}
              onChange={(e) =>
                setNewProductData((prev) => ({ ...prev, pageId: e.target.value }))
              }
              className="mb-4 p-2 border rounded"
            >
              <option value="1">Water</option>
              <option value="2">Solar</option>
              <option value="3">HVAC</option>
            </select>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProduct}>Create</Button>
            </div>
          </div>
        </div>
      )}

      <DataTable />
    </div>
  );
};

export default Page;
