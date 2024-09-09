import Link from "next/link";
import Image from "next/image";
import { dataBlurUrl } from "@/utils/data";
import "./style.scss";

const ImageComponent = ({ topicSlug, imageUrl, imageAlt }) => {
  return (
    <Link href={`/topic/${topicSlug}`}>
      <div className="chapter-card-img">
        {imageUrl ? (
          <Image
            loading="lazy"
            src={imageUrl}
            width={295}
            height={222}
            alt={imageAlt}
            style={{
              objectFit: "cover",
              placeholder: "...",
              borderRadius: "3%",
            }}
            placeholder="blur"
            blurDataURL={dataBlurUrl}
          />
        ) : (
          <div className="chapter-card-img-placeholder" />
        )}
      </div>
    </Link>
  );
};

export default ImageComponent;
