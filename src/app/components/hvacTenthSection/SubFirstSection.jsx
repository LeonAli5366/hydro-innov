"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast } from "sonner";
import getAllPageData from "@/app/lib/getAllPageData";

// Fetch data
const fetchData = async () => {
  const allData = await getAllPageData(3);
  return allData?.tenthSection || [];
};

const SubFirstSection = () => {
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    photo: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const tenthData = await fetchData();
      const firstObject = tenthData?.[0] || {};
      setInput({
        title: firstObject?.title || "",
        subtitle: firstObject?.subtitle || "",
        photo: firstObject?.photo || "",
      });
    };

    loadData();
  }, []);

  // Handle image selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoFile(file);
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined!");
  }
  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedPhotoUrl = input.photo;

    // If there's a new photo, upload it to Cloudinary
    if (photoFile) {
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
        updatedPhotoUrl = cloudinaryData?.url;

        if (!updatedPhotoUrl) {
          toast.error("Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.error("An error occurred while uploading the photo.");
        setLoading(false);
        return;
      }
    }

    // Prepare data for the API
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      photo: updatedPhotoUrl,
      pageId: 3,
    };

    // Update the data via API
    try {
      const response = await fetch(
        `${apiUrl}/api/dashboard/tesla/tenthSection?id=7`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        toast.success("Data updated successfully!");
      } else {
        toast.error("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("An error occurred while updating the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <form>
        <div className="flex flex-col gap-y-3 w-full">
          {/* Background image */}
          <div className="w-full flex flex-col gap-2">
            <span className="text-sm font-medium opacity-90">Image 1</span>
            <Image
              src={input.photo || "/placeholder-image.jpg"}
              alt="Image not found"
              width={800}
              height={500}
              className="sm:max-h-[600px] sm:h-full max-w-full w-full object-cover rounded"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="w-full flex max-sm:flex-col sm:items-center sm:justify-between gap-5">
            <label htmlFor="title" className="flex flex-col gap-y-1 w-full">
              <span className="text-sm font-medium opacity-90">Title 1</span>
              <Textarea
                id="title"
                value={input.title}
                onChange={(e) =>
                  setInput({ ...input, title: e.target.value })
                }
              />
            </label>
            <label htmlFor="subtitle" className="flex flex-col gap-y-1 w-full">
              <span className="text-sm font-medium opacity-90">Subtitle 1</span>
              <Textarea
                id="subtitle"
                value={input.subtitle}
                onChange={(e) =>
                  setInput({ ...input, subtitle: e.target.value })
                }
              />
            </label>
          </div>
        </div>
      </form>
      <Button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </Button>
    </div>
  );
};

export default SubFirstSection;
