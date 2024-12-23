"use client";
import { useState, useEffect } from "react";
import getAllPageData from "@/app/lib/getAllPageData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SubSecondSection = () => {
  const [input, setInput] = useState({
    tag: "",
    desc: "",
    video: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPageData(2);
        const fourthData = allData?.fourthSection || [];
        const fourthObject = fourthData?.[1] || {};

        setInput({
          tag: fourthObject?.tag || "",
          desc: fourthObject?.desc || "",
          video: fourthObject?.video || "",
        });
        setLoading(false); // Finished loading
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoFile(file);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  // Handle update
  const handleUpdate = async () => {
    let updatedVideoUrl = input.video;

    // Upload video to Cloudinary if a new video is selected
    if (videoFile) {
      const videoData = new FormData();
      videoData.append("file", videoFile);
      videoData.append("upload_preset", "estate");
      videoData.append("cloud_name", "dgupi3gce");

      try {
        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dgupi3gce/video/upload",
          {
            method: "POST",
            body: videoData,
          }
        );
        const cloudinaryData = await cloudinaryRes.json();
        updatedVideoUrl = cloudinaryData?.url;

        if (!updatedVideoUrl) {
          toast.error("Video upload failed. Please try again.");
          return;
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        toast.error("An error occurred while uploading the video.");
        return;
      }
    }

    // Prepare data for API update
    const updateData = {
      tag: input.tag,
      desc: input.desc,
      video: updatedVideoUrl,
      pageId: 2,
    };

    // Send data to the API
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/tesla/fourthSection?id=2`,
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
        setInput({ ...input, video: updatedVideoUrl });
      } else {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        toast.error("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("An error occurred while updating the data.");
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
    <div className="w-full flex flex-col gap-5">
      <form>
        <div className="flex flex-col gap-y-3 w-full">
          {/* Video preview */}
          <div className="w-full flex flex-col gap-2">
            <span className="text-sm font-medium opacity-90">
              Background Video
            </span>
            {input.video && (
              <video
                className="sm:max-h-[600px] sm:h-full w-full object-cover rounded"
                autoPlay
                muted
                loop
              >
                <source src={input.video} type="video/mp4" />
              </video>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="mt-2"
            />
          </div>

          <div className="w-full flex max-sm:flex-col sm:items-center sm:justify-between gap-5">
            {/* Tag */}
            <label htmlFor="tag" className="flex flex-col gap-y-1 w-full">
              <span className="text-sm font-medium opacity-90">Tag</span>
              <Textarea
                id="tag"
                value={input.tag}
                onChange={handleInputChange}
              />
            </label>

            {/* Description */}
            <label htmlFor="desc" className="flex flex-col gap-y-1 w-full">
              <span className="text-sm font-medium opacity-90">
                Description
              </span>
              <Textarea
                id="desc"
                value={input.desc}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
      </form>
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
};

export default SubSecondSection;
