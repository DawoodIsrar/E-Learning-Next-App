import Image from "next/image";
import BookLink from "./BookLink"; // Adjust the import path as necessary

const BookWrapper = ({ book }) => {
  return (
    <BookLink bookUrl={book?.url}>
      <div className="book">
        <div className="book-image-wrapper">
          {book?.cover_image && (
            <Image
              src={book?.cover_image}
              alt={book?.image_alt}
              width={112}
              height={161}
            />
          )}
        </div>
        <h4>{book?.title}</h4>
      </div>
    </BookLink>
  );
};

export default BookWrapper;
