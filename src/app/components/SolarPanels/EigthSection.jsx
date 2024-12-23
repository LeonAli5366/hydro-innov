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

const EigthSection = () => {
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    titleone: "",
    subtitleone: "",
    titletwo: "",
    subtitletwo: "",
    titlethree: "",
    subtitlethree: "",
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
        const eigthData = allData?.eighthSection || [];
        setInput({
          title: eigthData?.title || "",
          subtitle: eigthData?.subtitle || "",
          titleone: eigthData?.titleone || "",
          subtitleone: eigthData?.subtitleone || "",
          titletwo: eigthData?.titletwo || "",
          subtitletwo: eigthData?.subtitletwo || "",
          titlethree: eigthData?.titlethree || "",
          subtitlethree: eigthData?.subtitlethree || "",
          photo: eigthData?.photo || "",
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    let updatedPhotoUrl = input.photo;

    // Handle photo upload if there's a new file selected
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
      ...input,
      photo: updatedPhotoUrl,
      pageId: 2,
    };

    // Update data via API
    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/tesla/eighthSection?id=2`,
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
            <CardTitle>Section 8 Content</CardTitle>
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
                  className="sm:max-h-[600px] sm:h-full max-w-full w-full object-cover rounded"
                />
              )}
              <input
                type="file"
                name="photo"
                className="mt-3"
                onChange={handlePhotoChange}
              />
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
