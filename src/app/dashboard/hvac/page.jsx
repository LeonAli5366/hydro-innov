"use client";

import EigthSection from "@/app/components/HvacPage/EigthSection";
import NinethSection from "@/app/components/HvacPage/NinethSection";
import TenthSection from "@/app/components/HvacPage/TenthSection";
import SeventhSection from "@/app/components/HvacPage/SeventhSection";
import FifthSection from "@/app/components/HvacPage/FifthSection";
import SixthSection from "@/app/components/HvacPage/SixthSection";
import FourthSection from "@/app/components/HvacPage/FourthSection";
import ThirdSection from "@/app/components/HvacPage/ThirdSection";
import SecondSection from "@/app/components/HvacPage/SecondSection";
import FirstSection from "@/app/components/HvacPage/FirstSection";

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
