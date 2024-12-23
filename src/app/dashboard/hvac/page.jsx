"use client";

import EigthSection from "@/app/components/HvacPage/EigthSection";
import FifthSection from "@/app/components/HvacPage/FifthSection";
import FirstSection from "@/app/components/HvacPage/FirstSection";
import FourthSection from "@/app/components/HvacPage/FourthSection";
import NinethSection from "@/app/components/HvacPage/NinethSection";
import SecondSection from "@/app/components/HvacPage/SecondSection";
import SeventhSection from "@/app/components/HvacPage/SeventhSection";
import SixthSection from "@/app/components/HvacPage/SixthSection";
import TenthSection from "@/app/components/HvacPage/TenthSection";
import ThirdSection from "@/app/components/HvacPage/ThirdSection";

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
