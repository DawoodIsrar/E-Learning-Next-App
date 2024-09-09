import Link from "next/link";
import "./style.scss";

const List = ({ selected, data }) => {
  return (
    <ul className="list-style-slug">
      {data?.map((item, index) => (
        <li
          className={`list-item-slug ${
            item.slug === selected ? "selected" : ""
          }`}
          key={index}
        >
          <Link key={item.id} href={`/${item.slug}`} className={`li-link-slug`}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
