import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import SubFirstSection from "../hvacfourthSection/SubFirstSection";
import SubSecondSection from "../hvacfourthSection/SubSecondSection";
import SubThirdSection from "../hvacfourthSection/SubThirdSection";


const FourthSection = () => {
  return (
    <>
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Sec 4 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* Sub sec 1 */}
            <SubFirstSection />
            {/* Sub sec 2 */}
            <SubSecondSection />
            {/* Sub sec 3 */}
            <SubThirdSection />
          </CardContent>
        </Card>
      </div>
      <div></div>
    </>
  );
};

export default FourthSection;
