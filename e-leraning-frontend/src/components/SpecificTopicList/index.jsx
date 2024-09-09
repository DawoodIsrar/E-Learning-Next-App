"use client";
import { getEditorCourseDetails, getEditorTopicsList } from "@/services/editor";
import { getCourseAccessTitle, getEnglishStatusString } from "@//utils";
import CoursesFooter from "@/components/CoursesFooter";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CoursesTable from "@/components/CoursesTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import "@/assets/scss/CourseTopicList.scss";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const TableColumns = [
  {
    id: "checked",
    type: "checkbox",
    checked: false,
  },
  {
    id: "id",
    label: "ID",
    sortingId: "id",
  },
  {
    id: "identifier",
    label: "UNIQUE IDENTIFIER",
    sortingId: "unique_identifier",
    tooltip: {
      list: [
        "12 digit number",
        "The first 8 digits are the same as Chapter unique identifier",
      ],
    },
  },
  {
    id: "name",
    label: "SHORT TITLE",
    sortingId: "name",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "length",
    label: "CONTENT LENGTH ",
    sortingId: "content length",
  },
  {
    id: "slug",
    label: "TOPIC  SLUG ",
    sortingId: "topic slug",
  },
  {
    id: "figure",
    label: "MAIN  FIGURE ",
    sortingId: "main figure",
  },
  {
    id: "chapter",
    label: "CHAPTER ",
    sortingId: "chapter",
  },
  {
    id: "status",
    label: "VISIBILITY STATUS",
    sortingId: "visibility_status",
  },
  {
    id: "practice",
    label: "PRACTICE",
    sortingId: "practice",
  },
  {
    id: "index",
    label: "INDEX",
    sortingId: "index",
  },
  {
    id: "production",
    label: "TO PRODUCTION",
    sortingId: "production",
  },
  {
    style: {
      width: "30px",
      minWidth: "10px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    id: "english",
    label: "ENGLISH STATUS",
    sortingId: "english_edit_status",
  },

  {
    id: "createdBy",
    label: "AUTHOR",
    sortingId: "author",
  },
  {
    id: "createdOn",
    label: "CREATED ON        ",
    sortingId: "created_on",
    isDate: true,
  },
  {
    id: "updatedOn",
    label: "UPDATED ON  ",
    sortingId: "updated_on",
    isDate: true,
  },

  {
    id: "title",
    label: "H1 TITLE",
    sortingId: "title",
  },
];

function createData(
  checked,
  id,
  identifier,
  name,
  length,
  slug,
  figure,
  chapter,
  status,
  practice,
  index,
  production,
  english,
  createdBy,
  createdOn,
  updatedOn,
  title
) {
  return {
    checked,
    id,
    identifier,
    name,
    length,
    slug,
    figure,
    chapter,
    status,
    practice,
    index,
    production,
    english,
    createdBy,
    createdOn,
    updatedOn,
    title,
  };
}

const FilterActions = [
  {
    label: "------",
    value: "",
  },
  {
    label: "Delete selected Topics ",
    value: "delete",
  },
  {
    label: "Change TOPIC ACCESS of selected Topics to Public",
    value: "set_public",
  },
  {
    label: "Change TOPIC ACCESS of selected Topics to Member Only",
    value: "set_member_only",
  },
  {
    label: "Change TOPIC ACCESS of selected Topics to Editor Only",
    value: "set_editor_only",
  },
  {
    label: "Change INDEX of selected Topics to index",
    value: "set_index",
  },
  {
    label: "Change INDEX of selected Topics to no-index",
    value: "set_noindex",
  },
  {
    label: "Change PROD of selected Topics to Yes",
    value: "set_to_production",
  },
  {
    label: "Change PROD of selected Topics to No",
    value: "set_not_to_production",
  },
];

const SpecificTopicList = () => {
  const { data: session } = useSession();
  const { accessToken } = session || {};
  const router = useRouter();
  const token = accessToken;
  const { id } = useParams();

  const [courseDetails, setCourseDetails] = useState({});
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessLevel, setAccessLevel] = useState("");
  const [data, setData] = useState([]);

  const updateData = (loading = true) => {
    getTopicsList(loading);
    getCourseDetails(loading);
  };

  useEffect(() => {
    if (id && token) {
      updateData();
    }
  }, [id, token]);

  const getTopicsList = async (loading) => {
    if (loading) {
      setIsLoading(true);
    }
    const response = await getEditorTopicsList(token, id);

    setData(response);
    createTableData(response);
    if (loading) {
      setIsLoading(false);
    }
  };

  const getCourseDetails = async (loading) => {
    if (loading) {
      setIsLoading(true);
    }
    const response = await getEditorCourseDetails(token, id);
    if (response?.result === "ok") {
      const resData = response?.data?.data;
      setCourseDetails(resData);
      setAccessLevel(getCourseAccessTitle(resData?.visibility_status));
    }

    if (loading) {
      setIsLoading(false);
    }
  };

  const createTableData = (data) => {
    setIsLoading(true);
    const tempData = [];

    data?.forEach((d) => {
      const {
        unique_identifier,
        short_title,
        content,
        topic_slug,
        main_figure_url,
        chapter,
        visibility_status,
        practice,
        index,
        to_production,
        english_edit_status,
        author,
        created_on,
        updated_on,
        h1_title,
        id,
      } = d;
      tempData.push(
        createData(
          false,
          id,
          unique_identifier,
          <Link className="hide_link_style" href={`/topic/${topic_slug}`}>
            {short_title}
          </Link>,
          content.length,
          topic_slug,
          main_figure_url?.split(".com")?.[1],
          chapter,
          getCourseAccessTitle(visibility_status),
          <img
            src={
              practice
                ? "https://staging-api.d-libro.com/static/admin/img/icon-yes.svg"
                : "https://staging-api.d-libro.com/static/admin/img/icon-no.svg"
            }
          />,
          <img
            src={
              index
                ? "https://staging-api.d-libro.com/static/admin/img/icon-yes.svg"
                : "https://staging-api.d-libro.com/static/admin/img/icon-no.svg"
            }
          />,
          <img
            src={
              to_production
                ? "https://staging-api.d-libro.com/static/admin/img/icon-yes.svg"
                : "https://staging-api.d-libro.com/static/admin/img/icon-no.svg"
            }
          />,
          english_edit_status,
          author,
          moment(created_on).format("MMM. DD, YYYY"),
          moment(updated_on).format("MMM. DD, YYYY"),
          h1_title
        )
      );
    });

    setTableRows(tempData);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <button
        onClick={() => {
          router.push("/course-list");
        }}
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
        className="back_button"
      >
        <ArrowBack
          className="backbutton_icon"
          style={{ color: "var(--text_primary)" }}
        />{" "}
        <span
          className="backbutton_text"
          style={{ color: "var(--text_primary)" }}
        >
          Back
        </span>
      </button>
      <div className="courseTopicList">
        <div className="courseContainer">
          <div className="courseStructureHeader">
            <div className="courseStructureHeader_Heading">
              <span className="courseStructureHeader_HeadingLineLeft" />
              <div style={{ color: "var(--text_primary)" }}>
                Course Topic List
              </div>
              <span className="courseStructureHeader_HeadingLineRight" />
            </div>

            <div className="courseStructureHeader_Main">
              <div className="courseStructureHeader_TitleContainer">
                <div className="courseStructureHeader_Title">
                  <span style={{ color: "var(--text_primary)" }}>
                    COURSE TITLE
                  </span>
                  <div style={{ color: "var(--text_primary)" }}>
                    {courseDetails?.short_title}
                  </div>
                </div>
                <div className="courseStructureHeader_DetailsContainer">
                  <div className="courseStructureHeader_Detail">
                    <span style={{ color: "var(--text_primary)" }}>
                      COURSE UNIQUE IDENTIFIER
                    </span>
                    <div style={{ color: "var(--text_primary)" }}>
                      {courseDetails?.unique_identifier}
                    </div>
                  </div>
                  <div className="courseStructureHeader_Detail">
                    <span style={{ color: "var(--text_primary)" }}>
                      COURSE ACCESS
                    </span>
                    <div style={{ color: "var(--text_primary)" }}>
                      {accessLevel}
                    </div>
                  </div>
                </div>
              </div>
              {courseDetails?.icon_url && (
                <div className="courseStructureHeader_IconContainer">
                  <Image
                    height={50}
                    width={65}
                    src={courseDetails.icon_url}
                    alt="courseIcon"
                    priority={true}
                  />
                </div>
              )}

              <div className="courseStructureHeader_Editors">
                <div className="courseStructureHeader_EditorsContainer">
                  <h6>ASSIGNED EDITORS</h6>
                  <div>
                    {courseDetails?.editors?.map((e, i) => (
                      <span key={i} style={{ color: "var(--text_primary)" }}>
                        {e?.editor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {tableRows?.length ? (
            <CoursesTable
              TableRows={tableRows}
              TableColumns={TableColumns}
              filterActions={FilterActions}
              token={token}
              updateData={updateData}
              topicList
              rawData={data}
              createTableData={createTableData}
            />
          ) : (
            <h4>No Data Found</h4>
          )}
        </div>

        <CoursesFooter className="mt-16" courseId={id} />
      </div>
    </div>
  );
};

export default SpecificTopicList;
