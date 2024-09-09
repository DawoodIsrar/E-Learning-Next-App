"use client";
import CoursesFooter from "@/components/CoursesFooter";
import CoursesTable from "@/components/CoursesTable";
import { useRouter, useParams } from "next/navigation";
import ArrowBack from "@mui/icons-material/ArrowBack";
import "@/assets/scss/CourseStructure.scss";
import {
  getCourseChapterList,
  getEditorCourseDetails,
  updateEditorCourseCover,
  updateEditorCourseIcon,
} from "@/services/editor";
import { useRef, useState, useEffect } from "react";
import { getCourseAccessTitle } from "@/utils";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const TableColumns = [
  {
    id: "identifier",
    label: "UNIQUE IDENTIFIER",
    sortingId: "unique_identifier",
    tooltip: {
      list: [
        "8 digit number",
        "The first 6 digits are the same as Course unique identifier",
      ],
    },
  },
  {
    id: "name",
    label: "CHAPTER TITLE",
    sortingId: "name",
    tooltip: {
      list: ["No more than 100 characters.", "& % $ # < > ? / cannot be used"],
    },
  },
  {
    id: "access",
    label: "CHAPTER ACCESS",
    tooltip: {
      text: "When Course Access is more strict, the system follows Course Access setting ",
    },
  },
  {
    id: "createdBy",
    label: "CREATED BY",
    sortingId: "author",
  },
  {
    id: "createdOn",
    label: "CREATED ON",
    sortingId: "created_on",
    isDate: true,
  },

  {
    id: "updatedOn",
    label: "UPDATED ON",
    sortingId: "updated_on",
    isDate: true,
  },

  {
    id: "checked",
    type: "checkbox",
    checked: false,
  },
];

function createData(
  identifier,
  name,
  access,
  createdBy,
  createdOn,
  updatedOn,
  checked,
  objId
) {
  return {
    identifier,
    name,
    access,
    createdBy,
    createdOn,
    updatedOn,
    checked,
    objId,
  };
}

const FilterActions = [
  {
    label: "------",
    value: "",
  },
  {
    label: "Delete selected Chapters ",
    value: "delete",
  },
  {
    label: "Change CHAPTER ACCESS of selected Chapters to Public",
    value: "set_public",
  },
  {
    label: "Change CHAPTER ACCESS of selected Chapters to Member Only",
    value: "set_member_only",
  },
  {
    label: "Change CHAPTER ACCESS of selected Chapters to Editor Only",
    value: "set_editor_only",
  },
];

const RenderIconUploader = ({
  title,
  img,
  Id,
  token,
  getCourseDetails,
  courseIcon = false,
}) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    setImage(img);
    setPath(img?.split(".com")?.[1]);
  }, [img]);

  const handleImageUpload = async (e) => {
    setPath(e.target.value);
    setImage(URL.createObjectURL(e.target.files[0]));
    let data = new FormData();
    data.append("id", Id);
    let response = "";
    if (title === "COURSE ICON") {
      data.append("icon", e.target.files[0]);
      response = await updateEditorCourseIcon(token, data);
    }
    if (title === "COURSE COVER") {
      data.append("cover_image", e.target.files[0]);
      response = await updateEditorCourseCover(token, data);
    }
    if (response?.id) {
      getCourseDetails(false);
    }
  };

  return (
    <div className="courseStructureHeader_IconsUploader">
      <div>{title}</div>\
      {image &&
        (courseIcon ? (
          <div className="courseStructureHeader_IconsUploaderIcon">
            <Image height={50} width={65} src={image} alt="courseIcon" />
          </div>
        ) : (
          <Image height={50} width={65} src={image} alt="courseIcon2" />
        ))}
      <span>{path}</span>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <button onClick={() => inputRef.current.click()}>Update Image</button>
    </div>
  );
};

const ChapterList = () => {
  const { data: session } = useSession();
  const { accessToken, user } = session || {};
  const router = useRouter();
  const token = accessToken;
  const role = user?.role;
  const { id } = useParams();

  const [courseDetails, setCourseDetails] = useState({});
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibilityStatus, setVisibilityStatus] = useState("");
  const [data, setData] = useState([]);

  const updateData = (loading = true) => {
    getChaptersList(loading);
    getCourseDetails(loading);
  };

  useEffect(() => {
    if (id && token) {
      updateData();
    }
  }, [id, token]);

  const getChaptersList = async (loading) => {
    if (loading) {
      setIsLoading(true);
    }
    const response = await getCourseChapterList(token, id);
    setData(response);
    createTableData(response);
    if (loading) {
      setIsLoading(false);
    }
  };

  const getCourseDetails = async (loading = true) => {
    if (loading) {
      setIsLoading(true);
    }
    const response = await getEditorCourseDetails(token, id);
    if (response?.result === "ok") {
      const resData = response?.data?.data;
      setCourseDetails(resData);
      setVisibilityStatus(getCourseAccessTitle(resData?.visibility_status));
    }

    if (loading) {
      setIsLoading(false);
    }
  };

  const createTableData = (data) => {
    const tempData = [];
    data?.forEach((d) => {
      const {
        unique_identifier,
        name,
        visibility_status,
        author,
        created_on,
        updated_on,
      } = d;
      tempData.push(
        createData(
          unique_identifier,
          <Link
            className="hide_link_style"
            href={`/add-chapter/${id}/${d?.id}`}
          >
            {name}
          </Link>,
          getCourseAccessTitle(visibility_status),
          author,
          moment(created_on).format("MMM. DD, YYYY"),
          moment(updated_on).format("MMM. DD, YYYY"),
          false,
          d?.id
        )
      );
    });
    setTableRows(tempData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Link href="/course-list" className="hide_link_style">
        <button className="back_button">
          <ArrowBack className="backbutton_icon" />{" "}
          <span className="backbutton_text">Back</span>
        </button>
      </Link>
      <div className="courseStructure">
        <div className="courseContainer">
          <div className="courseStructureHeader">
            <div className="courseStructureHeader_Heading">
              <span className="courseStructureHeader_HeadingLineLeft" />
              <div>Chapter List</div>
              <span className="courseStructureHeader_HeadingLineRight" />
            </div>

            <div className="courseStructureHeader_Main">
              <div className="courseStructureHeader_TitleContainer">
                <div className="courseStructureHeader_Title">
                  <span>COURSE TITLE</span>
                  <div>{courseDetails?.short_title}</div>
                </div>
                <div className="courseStructureHeader_DetailsContainer">
                  <div className="courseStructureHeader_Detail">
                    <span>COURSE UNIQUE IDENTIFIER</span>
                    <div>{courseDetails?.unique_identifier}</div>
                  </div>
                  <div className="courseStructureHeader_Detail">
                    <span>COURSE ACCESS</span>
                    <div>{visibilityStatus}</div>
                  </div>
                </div>
              </div>

              <div className="courseStructureHeader_IconsContainer">
                <RenderIconUploader
                  title="COURSE ICON"
                  img={courseDetails?.icon_url}
                  Id={courseDetails?.id}
                  token={token}
                  getCourseDetails={getCourseDetails}
                  courseIcon
                />
              </div>

              <div className="courseStructureHeader_Editors">
                <div className="courseStructureHeader_EditorsContainer">
                  <h6>ASSIGNED EDITORS</h6>
                  <div>
                    {courseDetails?.editors?.map((e, i) => (
                      <span key={i}>{e?.editor}</span>
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

export default ChapterList;
