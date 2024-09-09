import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useState, forwardRef, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import "./SearchModal.scss";

const SearchModal = forwardRef(({ setSearchModalOpen, handleMenu }, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const { slug } = useParams();

  const [topicSearch, setTopicSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.getElementById("searchTopic").focus();
    }
  }, []);

  const handleSearchResult = (value, type) => {
    if (!value) {
      return;
    }

    let searchUrl = "";

    if (type === "topic") {
      let tempCourseId = "";
      if (pathname.includes("/topic/") && pathname.split("/").length === 4) {
        tempCourseId = `&courseId=${pathname.split("/")[2]}`;
      }
      searchUrl = `/topic-search-result?type=${type}&query=${value}${tempCourseId}`;
    } else if (type === "course") {
      searchUrl = `/course-search-result?type=${type}&course=${slug}&query=${value}`;
    } else {
      return;
    }

    router.push(searchUrl);
    setSearchModalOpen(false);
  };

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    handleSearchResult(topicSearch, "topic");
    handleMenu(false);
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    handleSearchResult(courseSearch, "course");
    handleMenu(false);
  };

  return (
    <div ref={ref} className="searchModal">
      <form onSubmit={handleTopicSubmit} className="searchModalFrom">
        <label for="searchTopic">
          Search <b>Topic</b>{" "}
        </label>
        <div className="searchModalFromInputContainer">
          <input
            id="searchTopic"
            type="text"
            placeholder="Search"
            value={topicSearch}
            onChange={(e) => setTopicSearch(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">
            <SearchRoundedIcon />
          </button>
        </div>
      </form>

      {/* {!pathname.includes("/course/") && */}
      <form onSubmit={handleCourseSubmit} className="searchModalFrom">
        <label for="searchCourse">
          Search <b>Course</b>{" "}
        </label>
        <div className="searchModalFromInputContainer">
          <input
            id="searchCourse"
            type="text"
            placeholder="Search"
            value={courseSearch}
            onChange={(e) => setCourseSearch(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">
            <SearchRoundedIcon />
          </button>
        </div>
      </form>
      {/* } */}
    </div>
  );
});

export default SearchModal;
