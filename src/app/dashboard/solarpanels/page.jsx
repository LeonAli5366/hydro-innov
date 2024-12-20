/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import FirstSection from "@/app/components/SolarPanels/FirstSection";
import SecondSection from "@/app/components/SolarPanels/SecondSection";
import ThirdSection from "@/app/components/SolarPanels/ThirdSection";
import FifthSection from "@/app/components/SolarPanels/FifthSection";
import SeventhSection from "@/app/components/SolarPanels/SeventhSection";
import EigthSection from "@/app/components/SolarPanels/EigthSection";
import NinethSection from "@/app/components/SolarPanels/NinethSection";
import TenthSection from "@/app/components/SolarPanels/TenthSection";
import FourthSection from "@/app/components/SolarPanels/FourthSection";
import SixthSection from "@/app/components/SolarPanels/SixthSection";

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
