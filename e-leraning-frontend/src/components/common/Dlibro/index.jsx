import { whyDlibroCards } from "@/utils/data";
import LibroCardContainer from "../../About/LibroCard/LibroCardContainer";
import Section from "@/components/shared/Section";
import "./style.scss";

const Dlibro = () => {
  return (
    <Section
      sectionClasses={"dlibro-card-wrapper"}
      widthHandlerDivClasses={"dlibro-innerWrapper"}
    >
      <h2 className="section-heading">Why D-Libro</h2>

      <LibroCardContainer item={whyDlibroCards} />
    </Section>
  );
};

export default Dlibro;
