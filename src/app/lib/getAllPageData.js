// lib/getAllPageData.js
export default async function getAllPageData(pageId) {
    if (!pageId || isNaN(pageId)) {
      throw new Error("Invalid or missing page ID");
    }
  
    try {
      const res = await fetch(`http://localhost:3000/api/dashboard/tesla/page?id=${pageId}`, {
        next: {
          revalidate: 60,
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch page data");
      }
  
      const data = await res.json();
  
      if (data.status !== "Success") {
        throw new Error(data.message || "Unexpected API response");
      }
  
      return data.data;
    } catch (error) {
      console.error("Error fetching page data:", error);
      throw new Error(error.message || "An error occurred while fetching page data");
    }
  }


  
  