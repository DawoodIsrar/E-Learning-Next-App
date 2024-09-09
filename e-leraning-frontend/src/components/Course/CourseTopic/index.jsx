import ReuseableCarousel from "../../common/ReuseableCarousel";
import { Accordion } from "@radix-ui/react-accordion";

const Chapter = ({ title, cards }) => {
  return (
    <div className="chapter-container">
      <div className="accordions-container">
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value={"1"}>
            <Accordion.Trigger>
              <div>
                <div className="title">{title}</div>
                <Image
                  src={ArrowDown}
                  width={0}
                  height={0}
                  alt="accordion arrow"
                  className="arrow-icon"
                />
              </div>
            </Accordion.Trigger>
            <Accordion.Content className="accordion-content">
              1
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
      <h3 className="title">{title}</h3>
      <ReuseableCarousel className="chapter-slick-carusal">
        {cards?.map((card) => {
          return (
            <ChapterCard
              key={card.title}
              title={card.title}
              imageUrl={card.url}
            />
          );
        })}
      </ReuseableCarousel>
    </div>
  );
};
export default Chapter;
