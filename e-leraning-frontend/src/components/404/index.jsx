"use client";

import "./style.scss";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NotFoundImage from "@/assets/images/NotFoundImage.png";

const page = ({ error, title, subTitle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    if (pathname.includes("blog")) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="not-found-div">
      {error && (
        <Image
          className={"image404"}
          height={400}
          width={424}
          src={NotFoundImage.src}
          alt="404 image"
        />
      )}

      <h2>{title || "Page not found"}</h2>
      <p>{subTitle || "The page you requested does not exist."}</p>
      <div className="button-wrapper">
        <button onClick={handleClick}>Go back</button>
      </div>
    </div>
  );
};

export default page;
