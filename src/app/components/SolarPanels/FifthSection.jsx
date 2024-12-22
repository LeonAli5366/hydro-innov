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
import React, { useState } from "react";
import getAllPageData from "@/app/lib/getAllPageData";
import { toast } from "sonner";

// Fetch data
const allData = await getAllPageData(2);
const fifthData = allData?.fifthSection || [];
console.log(fifthData);

const FifthSection = () => {
  const [input, setInput] = useState({
    title: fifthData.title,
    subtitle:fifthData.subtitle,
    photo: fifthData.photo,
  });

  

  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoFile = e.target.photo?.files[0];
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      photo: input.photo,
      pageId: 2,
    };

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
        const photoUrl = cloudinaryData?.url;

        if (photoUrl) {
          updateData.photo = photoUrl;
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.error("An error occurred while uploading the photo.");
        return;
      }
    }

    try {
      const apiRes = await fetch(
        `http://localhost:3000/api/dashboard/tesla/fifthSection?id=1`,
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

  return (
    <div className="p-5">
      <form onSubmit={handleUpdate}>
        <Card>
          <CardHeader>
            <CardTitle>Section 5 Content</CardTitle>
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
                className="max-h-[600px] h-full max-w-full w-full object-cover rounded"
              />
              <input type="file" name="photo" />
            </div>
            <div className="flex items-center justify-between gap-5 w-full">
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                />
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
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

export default FifthSection;
