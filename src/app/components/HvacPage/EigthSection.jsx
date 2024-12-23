/* eslint-disable @next/next/no-img-element */
"use client";
import getAllPageData from "@/app/lib/getAllPageData";
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

// Fetch data
const allData = await getAllPageData(3);
const eigthData = allData?.eighthSection || [];

const EigthSection = () => {
  const [input, setInput] = useState({
    title: eigthData.title,
    subtitle: eigthData.subtitle,

    titleone: eigthData.titleone,
    subtitleone: eigthData.subtitleone,

    titletwo: eigthData.titletwo,
    subtitletwo: eigthData.subtitletwo,

    titlethree: eigthData.titlethree,
    subtitlethree: eigthData.subtitlethree,
    photo: eigthData.photo,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoFile = e.target.photo?.files[0];

    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      titleone: input.titleone,
      subtitleone: input.subtitleone,
      titletwo: input.titletwo,
      subtitletwo: input.subtitletwo,
      titlethree: input.titlethree,
      subtitlethree: input.subtitlethree,
      pageId: 3,
      photo: input.photo,
    };

    console.log(updateData);

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
        alert("An error occurred while uploading the photo.");
        return;
      }
    }

    try {
      const apiRes = await fetch(
        `https://hydro-innov-6gkn-hkxr87350-leonali5366s-projects.vercel.app/api/dashboard/tesla/eighthSection?id=3`,
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
        alert("Section updated successfully!");
      } else {
        alert("Failed to update Section.");
      }
    } catch (error) {
      console.error("Error updating Section:", error);
      alert("An error occurred while updating the Section.");
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleUpdate}>
        <Card>
          <CardHeader>
            <CardTitle>Section 8 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              {[
                "title",
                "subtitle",
                "titleone",
                "subtitleone",
                "titletwo",
                "subtitletwo",
                "titlethree",
                "subtitlethree",
              ].map((field, index) => (
                <label
                  key={index}
                  htmlFor={field}
                  className="flex flex-col gap-y-1"
                >
                  <span className="text-sm font-medium opacity-90 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </span>
                  <Textarea
                    id={field}
                    value={input[field]}
                    onChange={(e) =>
                      setInput({ ...input, [field]: e.target.value })
                    }
                  />
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium opacity-90">
                Background Photo
              </span>
              {input.photo && (
                <img
                  src={input.photo}
                  alt="Background Photo"
                  width={800}
                  height={500}
                  className="object-cover rounded"
                />
              )}
              <input type="file" name="photo" className="mt-3" />
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

export default EigthSection;
