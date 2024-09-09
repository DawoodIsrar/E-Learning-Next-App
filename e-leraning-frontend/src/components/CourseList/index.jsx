"use client";
import { getAllEditorCourse } from "@/services/course";
import CoursesFooter from "@/components/CoursesFooter";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CoursesTable from "@/components/CoursesTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import "@/assets/scss/CourseTopicList.scss";
import ExternalLink from "@/assets/icons/ExternalLink";
import moment from "moment";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";

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
    tooltip: {
      list: ["12 digit number", "The first 8 digits are the same as course id"],
    },
  },
  {
    id: "action",
    label: "Action",
    sortingId: "action",
  },
  {
    id: "unique_identifier",
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
    id: "short_title",
    label: "SHORT TITLE",
    sortingId: "short_title",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "header_image",
    label: "HEADER IMAGE",
    sortingId: "header_image",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "header_description",
    label: "HEADER DESCRIPTION",
    sortingId: "header_description",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "breadcrumb_name",
    label: "BREADCRUM NAME",
    sortingId: "breadcrumb_name",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "course_slug",
    label: "COURSE SLUG",
    sortingId: "course_slug",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "primary_color",
    label: "PRIMARY COLOR",
    sortingId: "primary_color",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "secondary_color",
    label: "SECONDARY COLOR",
    sortingId: "secondary_color",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "primary_icon_url",
    label: "PRIMARY ICON",
    sortingId: "primary_icon_url",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "secondary_icon_url",
    label: "SECONDARY ICON",
    sortingId: "secondary_icon_url",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "meta_title",
    label: "META TITLE",
    sortingId: "meta_title",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "category",
    label: "CATEGORY",
    sortingId: "category",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "visibility_status",
    label: "COURSE ACCESS",
    sortingId: "visibility_status",
    tooltip: {
      text: "When Course or Chapter Access is more strict, the system follows the most strict access setting ",
    },
  },
  {
    id: "index",
    label: "INDEX",
    sortingId: "index",
  },

  {
    id: "created_at",
    label: "CREATED At",
    sortingId: "created_at",
    isDate: true,
  },
  {
    id: "updated_at",
    label: "UPDATED AT",
    sortingId: "updated_at",
    isDate: true,
  },
];
function createData(
  checked,
  id,
  unique_identifier,
  short_title,
  header_image,
  header_h1_title,
  header_description,
  breadcrumb_name,
  course_slug,
  primary_color,
  secondary_color,
  primary_icon_url,
  secondary_icon_url,
  meta_title,
  category,
  visibility_status,
  index,
  created_at,
  updated_at
) {
  return {
    checked,
    id,
    action: (
      <div className="dropdown">
        <div className="dropbtn">
          <ExternalLink />
        </div>
        <div className="dropdown-content">
          <Link href={`/course-edit/${id}`}>Edit Course</Link>
          <Link href={`/topic-list/${id}`}>View Course Topics</Link>
        </div>
      </div>
    ),
    unique_identifier,
    short_title,
    header_image,
    header_h1_title,
    header_description,
    breadcrumb_name,
    course_slug,
    primary_color,
    secondary_color,
    primary_icon_url,
    secondary_icon_url,
    meta_title,
    category,
    visibility_status,
    index,
    created_at,
    updated_at,
  };
}

const FilterActions = [
  {
    label: "------",
    value: "",
  },
  {
    label: "Delete selected Courses ",
    value: "delete",
  },
];

const CourseList = () => {
  const { data: session } = useSession();
  const { accessToken } = session || {};
  const router = useRouter();
  const token = accessToken;
  const { id } = useParams();

  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const updateData = (loading = true) => {
    setIsLoading(true);
    getCourseList(loading);
  };

  useEffect(() => {
    if (token) {
      updateData();
    }
  }, [token]);

  const getCourseList = async (loading) => {
    if (loading) {
      setIsLoading(true);
    }

    try {
      const response = await getAllEditorCourse(token);

      const filteredCourses = response.data.filter((course) => {
        return course.editors.some(
          (editor) => editor.editor === session.user.username
        );
      });

      setData(filteredCourses);
      createTableData(filteredCourses);
    } catch (error) {
      console.error("Error fetching course list:", error);
    } finally {
      if (loading) {
        setIsLoading(false);
      }
    }
  };

  const createTableData = (data) => {
    setIsLoading(true);
    const tempData = [];

    data?.forEach((d) => {
      const {
        id,
        unique_identifier,
        short_title,
        header_image,
        header_h1_title,
        header_description,
        breadcrumb_name,
        course_slug,
        primary_color,
        secondary_color,
        primary_icon_url,
        secondary_icon_url,
        meta_title,
        category,
        visibility_status,
        index,
        created_at,
        updated_at,
      } = d;

      tempData.push(
        createData(
          false,
          id,
          unique_identifier,
          short_title,
          header_image ? (
            <Image src={header_image} height={75} width={75} />
          ) : (
            header_image
          ),
          header_h1_title,
          header_description,
          breadcrumb_name,
          course_slug,
          primary_color,
          secondary_color,
          primary_icon_url ? (
            <Image src={primary_icon_url} height={75} width={75} />
          ) : (
            primary_icon_url
          ),
          secondary_icon_url ? (
            <Image src={secondary_icon_url} height={75} width={75} />
          ) : (
            secondary_icon_url
          ),
          meta_title,
          `${category.unique_identifier} ${category.name}`,
          visibility_status,
          d?.index ? "Yes" : "No",
          moment(created_at).format("MMM. DD, YYYY"),
          moment(updated_at).format("MMM. DD, YYYY")
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
          router.push("/");
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
              <div style={{ color: "var(--text_primary)" }}>Courses List</div>
              <span className="courseStructureHeader_HeadingLineRight" />
            </div>
          </div>

          {tableRows?.length ? (
            <CoursesTable
              TableRows={tableRows}
              TableColumns={TableColumns}
              filterActions={FilterActions}
              course={true}
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

export default CourseList;
