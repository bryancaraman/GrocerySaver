import AboutSectionOne from "@/components/List/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping List",
  description: "Shopping List Page",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="List"
        description="Create a shopping list."
      />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
