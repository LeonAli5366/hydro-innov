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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined!");
  }

  // Fetch product on initial load
  useEffect(() => {
    if (params?.id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(
            `${apiUrl}/api/dashboard/product?id=${params.id}`
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
  }, [params?.id, apiUrl]);

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

  // Handle product update
  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (photoFile) {
        const uploadedPhotoUrl = await uploadPhotoToCloudinary(photoFile);
        formData.photo = uploadedPhotoUrl;
      }

      const updatedData = {
        id: product.id,
        title: formData.title,
        subTitle: formData.subTitle,
        photo: formData.photo,
      };

      console.log("Payload being sent:", updatedData); // Debugging

      const res = await fetch(`${apiUrl}/api/dashboard/product`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const json = await res.json();

      if (json.status === "Success") {
        setProduct(json.data); // Update state
        setIsEditing(false); // Exit edit mode
      } else {
        throw new Error(json.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product.");
    } finally {
      setLoading(false);
    }
  };

  // Add this function to handle product deletion
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${apiUrl}/api/dashboard/product?id=${product.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const json = await res.json();

      if (json.status === "Success") {
        alert("Product deleted successfully.");
        router.push("/dashboard");
      } else {
        throw new Error(json.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
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
              onClick={() => router.push("/dashboard")}
            >
              Back to Products
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleProduct;
