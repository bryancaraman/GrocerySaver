import React from "react";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { SvgIconTypeMap } from "@mui/material";
import { ReactNode } from "react";

interface Feature {
  id: number;
  icon: ReactNode,
  title: string;
  paragraph: string;
}

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <LocalGroceryStoreIcon/>,
    title: "Grocery Searching",
    paragraph:
      "Find and compare grocery prices at national retailers near you.",
  },
  {
    id: 2,
    icon: <LocationOnIcon/>,
    title: "Location-based Filtering",
    paragraph:
      "Precise location coverage across the entire U.S. for comparing local grocery prices.",
  },
  {
    id: 3,
    icon: <ChecklistIcon/>,
    title: "Customizable Shopping List",
    paragraph:
      "Create and modify shopping lists to save your items and get total price estimates instantly. Stay organized and never miss an item at checkout again!",
  },
];

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

const SectionTitle = ({
  title,
  paragraph,
  center,
}: {
  title: string;
  paragraph: string;
  center?: boolean;
}) => {
  return (
    <div className={`mb-12 text-center ${center ? "mx-auto" : ""}`}>
      <h2 className="mb-4 text-3xl font-bold">{title}</h2>
      <p className="text-body-color">{paragraph}</p>
    </div>
  );
};

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph=""
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
