import "./style.scss";
import Image from "next/image";

const TopicCard = (props) => {
  return (
    <div className="cardContainer">
      <div className="content">
        <Image src={props.image} alt="seo logo" width={143} height={97} />
        <h4>
          {props.title1} <br /> {props.title2 ? props.title2 : ""}{" "}
        </h4>
      </div>
    </div>
  );
};

export default TopicCard;
