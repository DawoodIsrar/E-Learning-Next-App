import { learningChallengesData } from "@/utils/data";
import "./style.scss";

export const LearningChallengesContainer = () => {
  return learningChallengesData.map((item, index) => (
    <LearningChallengesCard item={item} index={index} key={index} />
  ));
};

const LearningChallengesCard = ({ item, index }) => {
  let { Image, Icon } = item;
  return (
    <div key={index} className="challenge-card">
      <div className="challenges-icons">
        <Image className="learning-image" width="48" height="48" />
        <Icon
          className={item.heading === "Books" ? "bookIcon" : "cross-icon"}
          width="28"
          height="28"
        />
      </div>
      <h3>{item.heading}</h3>
      <div className="card-description">
        <p>{item.paragraph}</p>
        <p className="padding-p">{item.paragraphSub}</p>
      </div>
    </div>
  );
};

export default LearningChallengesContainer;
