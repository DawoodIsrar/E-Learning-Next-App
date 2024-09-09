import Link from "next/link";
import { allFooterPages } from "@/services/home";
import "./style.scss";

const Pages = async () => {
  const data = await allFooterPages();
  const sortedData = data?.sort((a, b) => a.position - b.position);

  return (
    <ul className="list">
      <li key={"others-heading"} className="pages-heading">
        OTHERS
      </li>
      {sortedData?.map((page, index) => (
        <li key={index}>
          <Link className="pages-links" href={`/${page.url}`} key={index}>
            {page.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pages;
