/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import getAllPageData from "@/app/lib/getAllPageData";
import { toast } from "sonner";

const SecondSection = () => {
  // State for input fields and loading state
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPageData(1);
        const secondData = allData?.secondSection || {}; 

        // Update state with fetched data
        setInput({
          title: secondData.title || "",
          subtitle: secondData.subtitle || "",
          photo: secondData.photo || "",
        });

        setLoading(false); // Finished loading
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined!");
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoFile = e.target.photo?.files[0];
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      photo: input.photo,
      pageId: 1,
    };

    // Handle image upload if a new photo is selected
    if (photoFile) {
      const photoData = new FormData();
      photoData.append("file", photoFile);
      photoData.append("upload_preset", "estate");
      photoData.append("cloud_name", "dgupi3gce");
    
      try {
        console.log("Uploading photo to Cloudinary...");
        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dgupi3gce/image/upload",
          {
            method: "POST",
            body: photoData,
          }
        );
    
        const cloudinaryData = await cloudinaryRes.json();
        console.log("Cloudinary response:", cloudinaryData);
    
        const photoUrl = cloudinaryData?.url;
        if (photoUrl) {
          setNewProductData((prev) => ({ ...prev, photo: photoUrl }));
          console.log("Photo URL:", photoUrl);
        } else {
          throw new Error("Photo URL not found in Cloudinary response");
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("An error occurred while uploading the photo.");
        return;
      }
    }
    

    // Update section in the backend
    try {
      const apiRes = await fetch(
        `${apiUrl}/api/dashboard/tesla/secondSection?id=1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const apiData = await apiRes.json();

      if (apiData.status === "Success") {
        toast.success("Section updated successfully!");
      } else {
        toast.error("Failed to update Section.");
      }
    } catch (error) {
      console.error("Error updating Section:", error);
      toast.error("An error occurred while updating the Section.");
    }
  };

  // Handle loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5">
      <form onSubmit={handleUpdate}>
        <Card>
          <CardHeader>
            <CardTitle>Section 2 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-medium opacity-90">
                Background Photo
              </span>
              {input.photo && (
                <img
                  src={input.photo}
                  alt="Background Photo"
                  width={800}
                  height={500}
                  className="object-cover rounded sm:max-h-[600px] max-w-full w-full sm:h-full"
                />
              )}
              <input type="file" name="photo" />
            </div>
            <div className="w-full flex max-sm:flex-col sm:items-center sm:justify-between gap-5">
              <label htmlFor="title" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea
                  name="title"
                  id="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                />
              </label>
              <label
                htmlFor="subtitle"
                className="flex flex-col gap-y-1 w-full"
              >
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
                  name="subtitle"
                  id="subtitle"
                  value={input.subtitle}
                  onChange={(e) =>
                    setInput({ ...input, subtitle: e.target.value })
                  }
                />
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Update</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SecondSection;
