import { formatDate } from "@/utils/common";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blogData }) => {
  return (
    <div className="blog-card">
      <div
        className="blog-img"
        style={{ backgroundColor: `${blogData?.background_color}` }}
      >
        <Image
          src={blogData?.header_image}
          alt={blogData?.header_image_alt}
          width={400}
          height={240}
        />
      </div>
      <div className="blog-card-content">
        <Link href={`/blog/${blogData?.slug}`}>
          <h2>{blogData?.header_h1_title}</h2>
        </Link>
        <p>{blogData?.header_first_paragraph}</p>
        <div className="blogcard-date">
          <p>{blogData?.header_author.username}</p>
          <p>{formatDate(blogData?.publication_date)}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
