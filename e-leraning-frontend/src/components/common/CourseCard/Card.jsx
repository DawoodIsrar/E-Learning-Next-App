import "./style.scss";
import Arrow from "@/assets/icons/ArrowUpRight";
import Image from "next/image";
import Link from "next/link";

const Card = ({ course }) => {
  return (
    <Link className="course-card" href={`/course/${course?.course_slug}`}>
      <div className="course-card-upperarea">
        <div className="images-wrapper">
          {course?.icon_url && (
            <div className="course-card-upperarea-images">
              <Image
                src={course.icon_url}
                width={48}
                height={48}
                className="course-card-image1"
                alt={"icon1"}
              />
            </div>
          )}
          {course?.secondary_icon_url && (
            <div className="course-card-upperarea-images">
              <Image
                src={course.secondary_icon_url}
                width={48}
                height={48}
                className="course-card-image1"
                alt={"icon2"}
              />
            </div>
          )}
        </div>
        <div>
          <Arrow width="24" height="24" />
        </div>
      </div>

      <h3 className="course-card-title">{course?.short_title}</h3>
    </Link>
  );
};

export default Card;
