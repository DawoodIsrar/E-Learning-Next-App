import "./style.scss";
import ChapterComponent from "./Chapter";

const CoursesAvailable = ({
  title,
  chapterDetails,
  bookmarkColor,
  islibrary,
  isLibraryCourse,
  onBookmarkChanged,
}) => {
  return (
    <ChapterComponent
      onBookmarkChanged={onBookmarkChanged}
      title={title}
      bookmarkColor={bookmarkColor}
      chapterDetails={chapterDetails}
      islibrary={islibrary}
      isLibraryCourse={isLibraryCourse}
    />
  );
};

export default CoursesAvailable;
