import "./style.scss";
import Arrow from "@/assets/icons/ArrowUpRight";
import Image from "next/image";
import Link from "next/link";

const Card = ({ card, bgColor }) => {
  return (
    <Link
      className="course-card"
      href={`/course/${card?.course_slug}`}
      style={{ backgroundColor: bgColor || "transparent" }}
    >
      <div className="course-card-upperarea">
        <div className="images-wrapper">
          <div className="course-card-upperarea-images">
            <Image
              src={card?.icon_url}
              width={48}
              height={48}
              className="course-card-image1"
              alt={"icon"}
            />
          </div>

          {card?.secondary_icon_url && (
            <div className="course-card-upperarea-images">
              <Image
                src={card?.secondary_icon_url}
                className="course-card-image2"
                alt={"secondary_icon"}
                width={48}
                height={48}
              />
            </div>
          )}
        </div>
        <div>
          <Arrow />
        </div>
      </div>

      <h3 className="course-card-title">{card?.short_title}</h3>
    </Link>
  );
};

export default Card;
