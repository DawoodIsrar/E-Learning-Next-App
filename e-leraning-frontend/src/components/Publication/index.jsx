import "./style.scss";
import Section from "@/components/shared/Section";
import Book from "./Book";

const Publication = ({ books }) => {
  return (
    <Section sectionClasses="publication">
      <h2>Publications</h2>
      <div className="book-wrapper">
        {books?.map((book) => (
          <Book book={book} />
        ))}
      </div>
    </Section>
  );
};

export default Publication;
