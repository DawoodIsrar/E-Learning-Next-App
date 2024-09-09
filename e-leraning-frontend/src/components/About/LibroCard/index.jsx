import "./style.scss";
import Image from "next/image";

const LibroCard = (props) => {
  let {
    title,
    paragrapgh1,
    paragrapgh2,
    PrimaryImageComponent,
    index,
    altText,
  } = props;
  return (
    <div className={`libro-card`} key={index}>
      <div className="content">
        <h3 className="libro-title">{title}</h3>
        <p>{paragrapgh1}</p>
        <p>{paragrapgh2}</p>
      </div>
      <div className="image-container">
        <div className={`img-div ${index === 3 && "px-0"}`}>
          {typeof PrimaryImageComponent === "function" ? (
            <PrimaryImageComponent />
          ) : (
            <Image src={PrimaryImageComponent} alt={altText} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LibroCard;
