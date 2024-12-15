export default async function getThirdSectionData(id) {
    const res = await fetch(
      `http://localhost:3000/api/dashboard/tesla/thirdSection?id=${id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch first section data");
    }
  
    const data = await res.json();
  
    return data.data[0];
  }