import "./style.scss";
import LibroCard from ".";

export const LibroCardContainer = ({ item }) => {
  return (
    <div className={"card-wrapper"}>
      <RenderLibroCard item={item} />
    </div>
  );
};

const RenderLibroCard = ({ item }) => {
  return item.map((item, index) => {
    return (
      <LibroCard
        index={index}
        key={index}
        title={item.title}
        paragrapgh1={item.paragrapgh1}
        paragrapgh2={item.paragrapgh2}
        PrimaryImageComponent={item.primaryImageComponent}
        altText={item.altText}
      />
    );
  });
};
export default LibroCardContainer;
