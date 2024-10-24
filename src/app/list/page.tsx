import AboutSectionOne from "@/components/List/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

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
