import dynamic from "next/dynamic";
import OurCourses from "./OurCourses";
import HeroSection from "./HeroSection";
import Section from "../../shared/Section";
import { isProduction } from "@/utils/common";
import WhyDLibro from "@/components/common/Dlibro";
import LearnDiv from "@/components/common/LearnDiv";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import FaqSection from "@/components/common/FaqsSection";
import UnlockPotential from "@/components/common/UnlockPotential";
const InsertAds = dynamic(() => import("@/components/common/InsertAds"));
import TypicalLearningChallenges from "@/components/common/LearningChallenges";

const NonMember = ({ courses }) => {
  return (
    <>
      <HeroSection />
      {isProduction && (
        <Section sectionClasses="google-ads">
          <InsertAds ChildComppnent="HomePageATF" />
        </Section>
      )}
      <LearnDiv />
      <OurCourses courses={courses} />

      {isProduction && (
        <Section sectionClasses="google-ads">
          <InsertAds ChildComppnent="HomePageSecondHorizontal" />
        </Section>
      )}
      <TypicalLearningChallenges />
      <WhyDLibro />
      <FeaturedBlogs />
      <FaqSection />
      <UnlockPotential />
    </>
  );
};

export default NonMember;
