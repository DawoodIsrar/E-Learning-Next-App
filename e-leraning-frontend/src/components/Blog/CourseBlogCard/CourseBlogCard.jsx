import Link from "next/link";
import Image from "next/image";
import "./style.scss";
import Divider from "../Blogs/Divider";

const CourseBlogCard = ({
  bgColor,
  title,
  courseImg,
  imgLink,
  buttonBgColor,
  courseImgAlt,
}) => {
  return (
    <div
      className="course-blog-card-wrapper "
      style={{ backgroundColor: `${bgColor}` }}
    >
      <div>
        <Image src={courseImg} alt={courseImgAlt} width={20} height={20} />
      </div>
      <div className="text-and-btn">
        <h2>{title}</h2>
        <Link style={{ background: buttonBgColor }} href={`/${imgLink}`}>
          View Our Free Course
        </Link>
      </div>
    </div>
  );
};

export default CourseBlogCard;
