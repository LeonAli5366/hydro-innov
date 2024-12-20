import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubFirstSection from "../solarTenthSection/SubFirstSection";
import SubSecondSection from "../solarTenthSection/SubSecondSection";
import SubThirdSection from "../solarTenthSection/SubThirdSection";

export default function TenthSection() {
  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle>Section 10 Content</CardTitle>
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
  );
}
