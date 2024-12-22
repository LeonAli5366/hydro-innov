
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FirstSection from "../hvacsixthSection/FirstSection";
import SecondSection from "../hvacsixthSection/SecondSection";
import ThirdSection from "../hvacsixthSection/ThirdSection";
import FourthSection from "../hvacsixthSection/FourthSection";

const SixthSection = () => {
  return (
    <>
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 6 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* title & des 1 */}
            <FirstSection />
            {/* title & des 2 */}
            <SecondSection />
            {/* title & des 3 */}
            <ThirdSection />
            {/* title & des 4 */}
            <FourthSection />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SixthSection;
