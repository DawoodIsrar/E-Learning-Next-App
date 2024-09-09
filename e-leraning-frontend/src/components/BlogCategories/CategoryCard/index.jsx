import Image from "next/image";
import { formatDateForBlogDeatail, formatReadingTime } from "@/utils/common";
import Link from "next/link";
import "./style.scss";

const CategroryCard = ({ blog }) => {
  return (
    <Link className="categrory-card-wrapper" href={`/blog/${blog?.slug}`}>
      <div className="img-and-title-container">
        <div
          className="img-container"
          style={{ backgroundColor: blog?.background_color }}
        >
          {blog?.header_image && (
            <Image
              src={blog?.header_image}
              width={140}
              height={140}
              alt={blog?.header_image_alt ?? ""}
            />
          )}
        </div>
        <div className="headin-img-container">
          <h2>{blog?.header_h1_title}</h2>
        </div>
      </div>
      <div className="category-post">
        <div className="headin-img-container">
          <h2>{blog?.header_h1_title}</h2>
        </div>

        <p className="p-mbl">{blog?.header_first_paragraph}</p>
        <div className="date-section p-mbl">
          <p>{blog?.header_author?.username}</p>
          <div className="second-row">
            <p>{formatDateForBlogDeatail(blog?.publication_date)}</p>
            <p>{formatReadingTime(blog?.time_for_reading)} min read</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategroryCard;
