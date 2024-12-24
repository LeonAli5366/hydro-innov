"use client";

import EigthSection from "@/app/components/WaterPage/EigthSection";
import FifthSection from "@/app/components/WaterPage/FifthSection";
import FirstSection from "@/app/components/WaterPage/FirstSection";
import FourthSection from "@/app/components/WaterPage/FourthSection";
import NinethSection from "@/app/components/WaterPage/NinethSection";
import SecondSection from "@/app/components/WaterPage/SecondSection";
import SeventhSection from "@/app/components/WaterPage/SeventhSection";
import SixthSection from "@/app/components/WaterPage/SixthSection";
import TenthSection from "@/app/components/WaterPage/TenthSection";
import ThirdSection from "@/app/components/WaterPage/ThirdSection";


const page = () => {
  return (
    <>
      {/* sec 1 */}
      <FirstSection />

      {/* sec 2 */}
      <SecondSection />

      {/* sec 3 */}
      <ThirdSection />

      {/* sec 4 */}
      <FourthSection />

      {/* sec 5 */}
      <FifthSection />

      {/* sec 6 */}
      <SixthSection />

      {/* sec 7 */}
      <SeventhSection />

      {/* sec 8 */}
      <EigthSection />

      {/* sec 9 */}
      <NinethSection />

      {/* sec 10 */}
      <TenthSection />
    </>
  );
};

export default page;
