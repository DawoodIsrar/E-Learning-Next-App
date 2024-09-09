"use client";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";

const ChapterCard = ({ card }) => {
  return (
    <Link
      className="search-result-chapter-card-wrapper"
      href={`/topic/${card.topic_slug}`}
    >
      <div
        className="title"
        style={{ backgroundColor: `${card.course_color}` }}
      >
        <p>{card.course_name}</p>
      </div>
      <div className="searchresult-chapter-image">
        <Image
          alt={card.img_alt}
          src={card.main_figure_url}
          width={280}
          height={280}
        />
      </div>
      <div className="searchresult-chapter-name">
        <h4>{card.short_title}</h4>
      </div>
    </Link>
  );
};

export default ChapterCard;
