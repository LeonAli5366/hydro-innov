/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import getAllPageData from "@/app/lib/getAllPageData";

const SeventhSection = () => {
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    photo: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPageData(2);
        const seventhData = allData?.seventhSection || [];
        setInput({
          title: seventhData?.title || "",
          subtitle: seventhData?.subtitle || "",
          photo: seventhData?.photo || "",
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoFile(file);
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined!");
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    let updatedPhotoUrl = input.photo;

    // If there is a new photo selected, upload it
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
          return;
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.error("An error occurred while uploading the photo.");
        return;
      }
    }

    // Prepare update data
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      photo: updatedPhotoUrl,
      pageId: 2,
    };

    // Update data via API
    try {
      const apiRes = await fetch(
        `${apiUrl}/api/dashboard/tesla/seventhSection?id=2`,
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

  // Show loading or error states
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
            <CardTitle>Section 7 Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-medium opacity-90">
                Background Image
              </span>
              <img
                src={input.photo || "/placeholder-image.jpg"}
                alt="Section Background"
                width={800}
                height={500}
                className="sm:max-h-[600px] sm:h-full max-w-full w-full object-cover rounded"
              />
              <input
                type="file"
                name="photo"
                onChange={handlePhotoChange}
                className="mt-2"
              />
            </div>
            <div className="flex max-sm:flex-col sm:items-center sm:justify-between gap-5 w-full">
              <label htmlFor="title" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea
                  id="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                />
              </label>
              <label htmlFor="subtitle" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
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

export default SeventhSection;
