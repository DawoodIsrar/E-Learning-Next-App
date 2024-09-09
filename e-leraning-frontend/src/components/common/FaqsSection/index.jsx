import "./style.scss";
import { MainPageFAQ } from "@/utils/data";
import FaqAccordian from "./FaqAccordian";
import Section from "@/components/shared/Section";
import DesktopAds from "@/components/common/DesktopAds";

const FaqSection = () => {
  return (
    <Section
      sectionClasses="non-page-faq-wrapper"
      widthHandlerDivClasses="faq-container"
    >
      <div className="faq-container-inner">
        <div>
          <h2> FAQs</h2>

          <div className="faq-accordian">
            {" "}
            <FaqAccordian
              FAQ={MainPageFAQ}
              accordionHeight={974}
              accordionWidth={820}
            />{" "}
          </div>
        </div>
        <DesktopAds adToRender="HomePageVeticalAdThird" />
      </div>
    </Section>
  );
};

export default FaqSection;
