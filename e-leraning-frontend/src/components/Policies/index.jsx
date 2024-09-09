import List from "@/components/SlugPage/List";
import SideBarWrapper from "@/components/SlugPage/SideBarWrapper";
import "./style.scss";

const Policies = ({ selectedData, sortedPages, page_slug }) => {
  return (
    <>
      <SideBarWrapper data={sortedPages} />

      <div className="slug-main">
        <div className="slug-side">
          <List selected={page_slug} data={sortedPages} />
        </div>
        {selectedData && (
          <div
            className="slug-body editor-content"
            dangerouslySetInnerHTML={{
              __html: selectedData?.details,
            }}
          />
        )}
      </div>
    </>
  );
};

export default Policies;
