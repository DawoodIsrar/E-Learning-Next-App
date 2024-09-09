import { formatDateForBlogDeatail, formatReadingTime } from "@/utils/common";
import Image from "next/image";
import "./style.scss";
import Link from "next/link";

const MobileViewBlog = ({ blogs }) => {
  return (
    <div className="blog-wrapper">
      {blogs?.map((item) => {
        return (
          <Link
            href={`/blog/${item?.slug}` || "#"}
            key={item?.id}
            className="inner-wrapper"
          >
            <div className="main-title-and-img">
              <div
                className="img-wrapper"
                style={{ backgroundColor: `${item?.background_color}` }}
              >
                <Image
                  src={item?.header_image || ""}
                  alt={item?.header_image_alt}
                  width={72}
                  height={72}
                />
              </div>
              <div className="main-title">
                <h2>{item?.header_h1_title}</h2>
              </div>
            </div>
            <div className="main-text-div-and-auther-detail">
              <div className="main-text">
                <p>{item?.header_first_paragraph}</p>
              </div>
              <div className="author-detail">
                <p>{item?.header_author?.username}</p>
                <div>
                  <p>{formatDateForBlogDeatail(item?.publication_date)}</p>
                  <p>{formatReadingTime(item?.time_for_reading)} min read</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileViewBlog;
