"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PropagateLoader } from "react-spinners";

const SingleProduct = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    photo: "",
  });
  const [photoFile, setPhotoFile] = useState(null);

  // Fetch product on initial load
  useEffect(() => {
    if (params?.id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product?id=${params.id}`
          );
          const jsonData = await res.json();

          if (jsonData.status === "Success") {
            const productData = jsonData.data;
            setProduct(productData);
            setFormData({
              title: productData.title,
              subTitle: productData.subTitle,
              photo: productData.photo || "",
            });
          } else {
            throw new Error("Failed to fetch product");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [params?.id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  // Upload photo to Cloudinary
  const uploadPhotoToCloudinary = async (photoFile) => {
    const photoData = new FormData();
    photoData.append("file", photoFile);
    photoData.append("upload_preset", "estate");
    photoData.append("cloud_name", "dgupi3gce");

    try {
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dgupi3gce/image/upload",
        {
          method: "POST",
          body: photoData,
        }
      );
      const cloudinaryData = await cloudinaryRes.json();
      return cloudinaryData?.url;
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw new Error("Photo upload failed");
    }
  };

  // Update product details
  const updateProduct = async (id, updatedData) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product?id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update product");
    }

    return await res.json();
  };

  // Handle product update
  const handleUpdate = async () => {
    try {
      setLoading(true);

      // Upload photo to Cloudinary if a new file is selected
      if (photoFile) {
        const uploadedPhotoUrl = await uploadPhotoToCloudinary(photoFile);
        formData.photo = uploadedPhotoUrl; // Update photo URL in formData
      }

      // Update the product using the API
      const updatedProduct = await updateProduct(params.id, {
        title: formData.title,
        subTitle: formData.subTitle,
        photo: formData.photo,
      });

      setProduct(updatedProduct.data); // Update local state with the updated product
      setIsEditing(false); // Switch off edit mode
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader />
      </div>
    );

  // No product found state
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-5">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>
            {isEditing ? (
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Product Title"
              />
            ) : (
              product.title
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <Input
                name="subTitle"
                value={formData.subTitle}
                onChange={handleInputChange}
                placeholder="Product Subtitle"
                className="mb-4"
              />
              <Input
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                placeholder="Product Photo URL"
                className="mb-4"
              />
              <input type="file" onChange={handleFileChange} className="mb-4" />
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-4">{product.subTitle}</p>
              {product.photo ? (
                <Image
                  src={product.photo}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded mb-4"
                  width={256}
                  height={256}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded mb-4">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </>
          )}
          <div className="flex space-x-4">
            {isEditing ? (
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                Edit Product
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => router.push("/dashboard/products")}
            >
              Back to Products
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleProduct;
