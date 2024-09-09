"use client";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import CoursesFooter from "@/components/CoursesFooter";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { FileUploader } from "react-drag-drop-files";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { convertHTML } from "@/utils/common";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import "./style.scss";

const Editor = dynamic(() => import("@/components/common/CKEditor"), {
  ssr: false,
});

import {
  addEditorTopicDetails,
  getCourseChapterList,
  getEditorCourseDetails,
  getEditorTopicDetails,
  updateEditorTopicDetails,
} from "@/services/editor";
import { CourseAccessTitles, countSpecificWord } from "@/utils";
import { useParams, useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import "@/assets/scss/AddTopic.scss";
import Image from "next/image";
import { toast } from "react-toastify";

const topicIdError = "The topic ID must consist of four digits";
const contentError = "The topic must contain some content";

const AddTopic = () => {
  const router = useRouter();
  const { courseId, topicId } = useParams();

  const isLightTheme = "light";

  const { data: session } = useSession();
  const { accessToken } = session || {};
  const token = accessToken;

  const [imageName, setImageName] = useState("");
  const [adminTopicId, setAdminTopicId] = useState();
  const [adminChapterId, setAdminChapterId] = useState();
  const [adminCourseId, setAdminCourseId] = useState();
  const [contentTitle, setContentTitle] = useState("");
  const [dataFields, setDataFields] = useState({
    h1_title: "",
    img_alt: "",
    schema_json_1: "",
    schema_json_2: "",
    schema_json_3: "",
    og_image: { name: "", url: "" },
  });
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [selectedChapterOptions, setSelectedChapterOptions] = useState([]);
  const [visibilityStatus, setVisibilityStatus] = useState("public");
  const [tags, setTags] = useState([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [englishEditStatus, setEnglishEditStatus] = useState("not_started");
  const [index, setIndex] = useState(true);
  const [production, setProduction] = useState(false);
  const [practiceCheck, setPracticeCheck] = useState(false);

  const [image, setImage] = useState("");
  const [clearImage, setClearImage] = useState({ main: false, og: false });

  const [courseDetails, setCourseDetails] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [CKEditorState, setCKEditorState] = useState({
    content: "",
    loaded: false,
  });
  const [faqEditor, setFaqEditor] = useState({
    content: "",
    loaded: false,
  });
  const [slug, setSlug] = useState("");
  const [spaceWordsCount, setSpaceWordsCount] = useState(0);
  const [pngImageWarning, setPngImageWarning] = useState({
    main: false,
    og: false,
  });
  const fileTypes = ["SVG", "PNG", "JPG", "JPEG"];

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [errorMessage]);

  useEffect(() => {
    const count = countSpecificWord(CKEditorState.content, "&nbsp;");
    const faqCount = countSpecificWord(faqEditor.content, "&nbsp;");
    setSpaceWordsCount(count);
    setSpaceWordsCount(faqCount);
  }, [CKEditorState.content, faqEditor.content]);

  const handleOgImageChange = (e) => {
    if (e.target.files[0]?.type === "image/png") {
      setPngImageWarning({ ...pngImageWarning, og: true });
    } else {
      setPngImageWarning({ ...pngImageWarning, og: false });
    }
    setDataFields({
      ...dataFields,
      og_image: {
        name: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      },
    });
    if (e.target.files[0]) {
      setClearImage({ ...clearImage, og: true });
    }
  };

  const handleMainImageChange = (e) => {
    if (e.target.files[0]?.type === "image/png") {
      setPngImageWarning({ ...pngImageWarning, main: true });
    } else {
      setPngImageWarning({ ...pngImageWarning, main: false });
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageName(e.target.files[0]);
    if (e.target.files[0]) {
      setClearImage({ ...clearImage, main: true });
    }
  };

  const handleChangeDragDrop = (file) => {
    if (file.type === "image/png") setPngImageWarning(true);
    else setPngImageWarning(false);
    setImage(URL.createObjectURL(file));
    setImageName(file);
    if (file) {
      setClearImage(true);
    }
  };

  const handleClearImage = (e) => {
    setImage("");
    setImageName("");
    if (e.target.name === "og image") {
      setDataFields({ ...dataFields, og_image: { name: "", url: "" } });
    }
    setClearImage({
      ...clearImage,
      main: e.target.name === "og image",
      og: e.target.name === "og image",
    });
  };

  const onChapterChange = (value) => {
    setSelectedChapterId(value);
    const index = selectedChapterOptions.findIndex(
      (x) => x.value === parseInt(value)
    );
    setAdminChapterId(
      selectedChapterOptions?.[index]?.uniqueIdentifier
        .toString()
        ?.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"?.split("-")?.pop())
    );
  };

  const getTopicDetails = async () => {
    setIsLoading(true);
    const response = await getEditorTopicDetails(token, topicId);
    if (response?.id) {
      const {
        unique_identifier,
        short_title,
        h1_title,
        main_figure_url,
        og_image_url,
        meta_title,
        meta_description,
        content,
        faq,
        visibility_status,
        tags,
        chapter_id,
        img_alt,
        topic_slug,
        english_edit_status,
        schema_json_1,
        schema_json_2,
        schema_json_3,

        practice,
      } = response;
      setAdminTopicId(
        unique_identifier
          .toString()
          ?.replace(/(\d{4})(\d{2})(\d{2})(\d{4})/, "$1-$2-$3-$4")
          ?.split("-")?.[3]
      );
      setAdminChapterId(
        unique_identifier
          .toString()
          ?.replace(/(\d{4})(\d{2})(\d{2})(\d{4})/, "$1-$2-$3-$4")
          ?.split("-")?.[2]
      );
      setDataFields({
        ...dataFields,
        h1_title: h1_title,
        img_alt: img_alt,
        schema_json_1: schema_json_1,
        schema_json_2: schema_json_2,
        schema_json_3: schema_json_3,
        og_image: { name: "", url: og_image_url },
      });
      setContentTitle(short_title);
      setSelectedChapterId(chapter_id);
      setVisibilityStatus(visibility_status);
      setTags(tags.join(", "));
      setMetaTitle(meta_title);
      setMetaDescription(meta_description);
      setImage(main_figure_url);
      setCKEditorState({ content, loaded: true });
      setFaqEditor({ content, loaded: true });
      setFaqEditor({ content, loaded: true });
      setSlug(topic_slug);
      setIndex(response.index);
      setProduction(response.to_production);
      setEnglishEditStatus(english_edit_status);
      setPracticeCheck(practice);
    }
    setIsLoading(false);
  };

  const getCourseChaptersList = async () => {
    const response = await getCourseChapterList(token, courseId);
    if (response?.length > 0) {
      const chapterOptions = response.map((chapter) => ({
        label: chapter.name,
        value: chapter.id,
        uniqueIdentifier: chapter.unique_identifier,
      }));
      setSelectedChapterOptions(chapterOptions);
    }
  };

  const getCourseDetails = async () => {
    const response = await getEditorCourseDetails(token, courseId);
    if (response?.result === "ok") {
      const resData = response?.data?.data;
      setAdminCourseId(
        resData?.unique_identifier
          .toString()
          ?.replace(/(\d{4})(\d{2})/, "$1-$2")
          ?.split("-")
      );
      setCourseDetails({ name: resData?.name, icon_url: resData?.icon_url });
    }
  };

  useEffect(() => {
    if (token) {
      getCourseChaptersList();
      getCourseDetails();
      if (topicId !== "new") {
        getTopicDetails();
      }
    }
  }, [courseId, topicId, token]);

  const handleEditorChange = (evt) => {
    setCKEditorState({ content: evt.editor.getData(), loaded: true });
  };
  const handleFaqChange = (evt) => {
    setFaqEditor({ content: evt.editor.getData(), loaded: true });
  };

  const handleUpdateTopic = async () => {
    setErrorMessage("");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", topicId);
    const tempUniqueIdentifier = `${adminCourseId?.[0]}${adminCourseId?.[1]}${adminChapterId}${adminTopicId}`;
    console.log("formData", formData.get("content"));

    formData.append("unique_identifier", tempUniqueIdentifier);
    formData.append("short_title", contentTitle);
    if (imageName) {
      formData.append("main_figure", imageName);
    }
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);
    formData.append("content", CKEditorState.content);
    formData.append("faq", faqEditor.content);
    formData.append("visibility_status", visibilityStatus);
    formData.append("tags", tags);
    formData.append("chapter_id", selectedChapterId);
    formData.append("index", index);
    formData.append("to_production", production);
    formData.append("english_edit_status", englishEditStatus);
    formData.append("practice", practiceCheck);
    formData.append("h1_title", dataFields.h1_title);
    formData.append("img_alt", dataFields.img_alt);
    if (dataFields.og_image.name)
      formData.append("og_image", dataFields.og_image.name);
    formData.append("schema_json_1", dataFields.schema_json_1);
    formData.append("schema_json_2", dataFields.schema_json_2);
    formData.append("schema_json_3", dataFields.schema_json_3);

    console.log("formData", formData);

    const response = await updateEditorTopicDetails(token, formData);

    if (response?.id) {
      router.push(`/topic/${response?.topic_slug}`);
    }
  };

  const handleAddTopic = async () => {
    if (!imageName) {
      setErrorMessage("Main Image is required");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", topicId);
    formData.append(
      "unique_identifier",
      `${adminCourseId?.[0]}${adminCourseId?.[1]}${adminChapterId}${adminTopicId}`
    );
    formData.append("short_title", contentTitle);
    if (imageName) {
      formData.append("main_figure", imageName);
    }
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);
    formData.append("content", CKEditorState.content);
    formData.append("faq", faqEditor.content);

    formData.append("visibility_status", visibilityStatus);
    formData.append("tags", tags);
    formData.append("chapter_id", selectedChapterId);
    formData.append("index", index);
    formData.append("to_production", production);
    formData.append("english_edit_status", englishEditStatus);
    formData.append("practice", practiceCheck);
    formData.append("h1_title", dataFields.h1_title);
    formData.append("img_alt", dataFields.img_alt);
    if (dataFields.og_image.name)
      formData.append("og_image", dataFields.og_image.name);
    formData.append("schema_json_1", dataFields.schema_json_1);
    formData.append("schema_json_2", dataFields.schema_json_2);
    formData.append("schema_json_3", dataFields.schema_json_3);
    console.log("formData", formData.get("content"));

    const response = await addEditorTopicDetails(token, formData);

    toast.success("Topic has been added successfully");

    if (response?.result === "error") {
      const errRes = response?.error?.error;
      setErrorMessage(errRes[Object.keys(errRes)?.[0]]?.[0]);
    }
    if (response?.result === "ok") {
      const tempSlug = response?.data?.data?.topic_slug
        ? response?.data?.data?.topic_slug
        : response?.data?.data?.slug;
      router.push(`/topic/${tempSlug}`);
    }

    setIsLoading(false);
  };

  const onTopicIdChange = (e) => {
    if (e.target.value?.length < 5) {
      setAdminTopicId(e.target.value);
    }
    if (e?.target?.value?.length === 4 && errorMessage === topicIdError) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adminTopicId?.length !== 4) {
      setErrorMessage(topicIdError);
      return;
    }
    if (!CKEditorState.content && !faqEditor) {
      setErrorMessage(contentError);
      return;
    }
    if (topicId === "new") {
      handleAddTopic();
    } else {
      handleUpdateTopic();
    }
  };

  const onFixSpaces = () => {
    if (CKEditorState.content && faqEditor.content) {
      let temp = CKEditorState.content?.replace?.(/&nbsp;/g, " ");
      let tempFaq = faqEditor.content?.replace?.(/&nbsp;/g, " ");
      setFaqEditor({ ...faqEditor, content: tempFaq });
      setCKEditorState({ ...CKEditorState, content: temp });
    }
  };
  const handleBack = () => {
    if (topicId !== "new") {
      const tempSlug = slug.replace("_", "-");
      router.push(`/topic/${tempSlug}`);
    } else {
      router.push(`/topic-list/${courseId}`);
    }
  };

  const handleDataFieldsChange = (e) => {
    setDataFields({ ...dataFields, [e.target.name]: e.target.value });
  };

  const handleCleanHtml = (e) => {
    setCKEditorState((prev) => ({ ...prev, loaded: true }));
    const cleanMainContent = convertHTML(CKEditorState.content);
    setCKEditorState((prev) => ({
      ...prev,
      content: cleanMainContent,
      loaded: false,
    }));
    setFaqEditor((prev) => ({ ...prev, loaded: true }));
    let cleanFaqEditor = convertHTML(faqEditor.content);
    setFaqEditor((prev) => ({
      ...prev,
      content: cleanFaqEditor,
      loaded: false,
    }));
  };
  useEffect(() => {
    if (topicId === "new") {
      setCKEditorState({ ...CKEditorState, loaded: true });
      setFaqEditor({ ...faqEditor, loaded: true });
    }
  }, [topicId]);
  return (
    <>
      <button onClick={handleBack} className="back_button">
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
      <form onSubmit={handleSubmit} className="editContentContainer">
        <div className="editContentHeader">
          <h4>{topicId === "new" ? "Add a New " : "Edit "} Topic</h4>
          <div
            className="editContentHeaderCourse"
            style={{ minHeight: "3rem", color: "var(--text_primary)" }}
          >
            {courseDetails?.icon_url && (
              <div className="editContentHeaderCourse_icon">
                <Image
                  src={courseDetails?.icon_url}
                  alt="icon"
                  height={48}
                  width={48}
                />
              </div>
            )}
            {courseDetails?.name}
          </div>
        </div>

        <Grid container className="main_root_container_upload_content">
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
            style={{ marginTop: "-15px" }}
            className="uploadContent_inputsContainer"
          >
            {errorMessage && (
              <div className="errorMessage">
                {errorMessage || "No Error found"}
              </div>
            )}

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                CHAPTER
              </span>

              <select
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                value={selectedChapterId}
                onChange={(e) => onChapterChange(e.target.value)}
                required
              >
                <option value="">-------</option>
                {selectedChapterOptions?.map((chapter, i) => (
                  <option key={i} value={chapter.value}>
                    {chapter.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                UNIQUE IDENTIFIER
              </span>
              <div className="uniqueIdentifier_inputsContainer">
                <input
                  className={
                    isLightTheme
                      ? "uploadcontentinputfieldtwo widthautoclass"
                      : "uploadcontentinputfield widthautoclass"
                  }
                  value={`${adminCourseId?.[0] || "--"}-${
                    adminCourseId?.[1] || "--"
                  }`}
                  disabled={true}
                  // onChange={(e) => setUniqueIdentifier(e.target.value)}
                  required
                />
                <span>–</span>
                <input
                  className={
                    isLightTheme
                      ? "uploadcontentinputfieldtwo widthautoclass"
                      : "uploadcontentinputfield widthautoclass"
                  }
                  value={`${adminChapterId || "--"}`}
                  disabled={true}
                  // value={uniqueIdentifier}
                  // onChange={(e) => setUniqueIdentifier(e.target.value)}
                  required
                />
                <span>–</span>
                <input
                  className={
                    isLightTheme
                      ? "uploadcontentinputfieldtwo widthautoclass"
                      : "uploadcontentinputfield widthautoclass"
                  }
                  value={adminTopicId}
                  onChange={onTopicIdChange}
                  required
                  type="number"
                />
              </div>
            </div>
            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                SHORT TITLE
              </span>
              <input
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                placeholder="SHORT TITLE"
                value={contentTitle}
                onChange={(e) => {
                  setContentTitle(e.target.value?.slice(0, 80));
                }}
                required
              />
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                H1 TITLE
              </span>
              <input
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                placeholder="H1 TITLE"
                value={dataFields.h1_title}
                onChange={handleDataFieldsChange}
                name="h1_title"
                required
              />
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Topic Slug
              </span>
              <input
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                placeholder="topic slug"
                value={slug}
                // onChange={(e) => setSlug(e.target.value)}
                // required
                disabled={true}
                name="topic_slug"
              />
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Img alt
              </span>
              <input
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                placeholder="img alt"
                value={dataFields.img_alt}
                onChange={handleDataFieldsChange}
                name="img_alt"
              />
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Visibility Status
              </span>
              <select
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                value={visibilityStatus}
                onChange={(e) => setVisibilityStatus(e.target.value)}
              >
                {CourseAccessTitles.map((chapter, i) => (
                  <option key={i} value={chapter.value}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Tags(Max 5 Tags)
              </span>
              <input
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                placeholder="Tags(Max 5 Tags)"
                value={tags}
                required
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                META TITLE
              </span>
              <input
                className={
                  isLightTheme
                    ? "uploadcontentinputfieldtwo widthautoclass"
                    : "uploadcontentinputfield widthautoclass"
                }
                placeholder="META TITLE"
                value={metaTitle}
                onChange={(e) => {
                  setMetaTitle(e.target.value);
                }}
              />
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Meta Descriptions
              </span>
              <textarea
                className={
                  isLightTheme
                    ? "addcategory_textarea widthautoclass"
                    : "addcategory_textarea_sub widthautoclass"
                }
                id="message"
                rows="6"
                placeholder="Meta Descriptions"
                value={metaDescription}
                onChange={(e) =>
                  setMetaDescription(e.target.value?.slice(0, 300))
                }
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span
                  className="addcategory_text"
                  style={{
                    color:
                      metaDescription?.length < 120
                        ? "#FB8D01"
                        : metaDescription?.length >= 120 &&
                          metaDescription?.length <= 170
                        ? "#00CD2D"
                        : metaDescription?.length > 170 &&
                          metaDescription?.length <= 200
                        ? "#FB8D01"
                        : "#FF6666",
                  }}
                >
                  {metaDescription?.length} letters
                </span>
              </div>
            </div>

            <div>
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Schema JSON 1
              </span>
              <textarea
                className={
                  isLightTheme
                    ? "addcategory_textarea widthautoclass"
                    : "addcategory_textarea_sub widthautoclass"
                }
                id="message"
                rows="6"
                placeholder="schmea json 1"
                value={dataFields.schema_json_1}
                onChange={handleDataFieldsChange}
                name="schema_json_1"
              />
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Schema JSON 2
              </span>
              <textarea
                className={
                  isLightTheme
                    ? "addcategory_textarea widthautoclass"
                    : "addcategory_textarea_sub widthautoclass"
                }
                id="message"
                rows="6"
                placeholder="schmea json 2"
                value={dataFields.schema_json_2}
                onChange={handleDataFieldsChange}
                name="schema_json_2"
              />
              <span
                className="addcategory_text"
                style={{ color: `var(--text_primary)` }}
              >
                Schema JSON 3
              </span>
              <textarea
                className={
                  isLightTheme
                    ? "addcategory_textarea widthautoclass"
                    : "addcategory_textarea_sub widthautoclass"
                }
                id="message"
                rows="6"
                placeholder="schmea json 3"
                value={dataFields.schema_json_3}
                onChange={handleDataFieldsChange}
                name="schema_json_3"
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span
                  className="addcategory_text"
                  style={{
                    color:
                      metaDescription?.length < 120
                        ? "#FB8D01"
                        : metaDescription?.length >= 120 &&
                          metaDescription?.length <= 170
                        ? "#00CD2D"
                        : metaDescription?.length > 170 &&
                          metaDescription?.length <= 200
                        ? "#FB8D01"
                        : "#FF6666",
                  }}
                >
                  {metaDescription?.length} letters
                </span>
              </div>
            </div>

            <div className="editContent_editStatusContainer">
              <div>
                <label htmlFor="practiceCheck">Practice:</label>
                <select
                  id="practiceCheck"
                  value={practiceCheck}
                  onChange={(e) => setPracticeCheck(e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div>
                <label htmlFor="toProduction">Production:</label>
                <select
                  id="toProduction"
                  value={production}
                  onChange={(e) => setProduction(e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div>
                <label htmlFor="englishEditStatus">English edit status:</label>
                <select
                  id="englishEditStatus"
                  value={englishEditStatus}
                  onChange={(e) => setEnglishEditStatus(e.target.value)}
                >
                  <option value="not_started">Not Started</option>
                  <option value="wip">Work in Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div
                className="addcategory_checkbox"
                onClick={() => setIndex(!index)}
              >
                <input checked={index} type="checkbox" />
                <label>index/follow</label>
              </div>
            </div>

            <p className="mt-12px">
              <small>Main image</small>
            </p>
            <div className="editContentFileContainer">
              <div>
                <div className="main_slide_container">
                  {(imageName?.name || clearImage.main) && (
                    <div style={{ paddingBottom: "10px" }}>
                      <span>{imageName?.name}</span>
                    </div>
                  )}
                  <div>
                    <label htmlFor="contained-button-file">
                      <input
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        accept=".svg, .png, .jpeg, .jpg, .webp"
                        onChange={handleMainImageChange}
                        name="main image"
                      />
                      <span
                        className="editContentFileButton "
                        name="main image"
                      >
                        Select an Image File
                      </span>
                    </label>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <FileUploader
                    multiple={false}
                    // label="Drop a file right here"
                    hoverTitle=""
                    handleChange={handleChangeDragDrop}
                    name="file"
                    types={fileTypes}
                    children={
                      <div>
                        <div className="drop_file_container">
                          <div className="drop_file_container_text">
                            <span>or</span> <br />
                            Drop a file here <br />
                            <CloudUploadOutlinedIcon />
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>

              <div className="editContentFilePreview">
                <div className="editContentFilePreviewCross">
                  {clearImage.main && (
                    <Tooltip title="Clear Image" placement="top">
                      <div>
                        <span
                          style={{
                            color: `${isLightTheme ? "#363636" : "#FFFFFF"}`,
                            cursor: "pointer",
                          }}
                        >
                          <CancelIcon
                            onClick={handleClearImage}
                            name="main image"
                          />
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </div>
                <div
                  style={image ? { background: "transparent" } : {}}
                  className="editContentFilePreviewImgContainer"
                >
                  {image ? (
                    <Image
                      src={image}
                      className=""
                      alt="topic-image"
                      width={240}
                      height={240}
                    />
                  ) : (
                    <span>Preview</span>
                  )}
                </div>
                {pngImageWarning.main && (
                  <div className="editContent_pngWarning">
                    This should be done in the frontend side ?
                  </div>
                )}
              </div>
            </div>

            <p className="mt-12px">
              <small>OG image</small>
            </p>
            <div className="editContentFileContainer">
              <div>
                <div className="main_slide_container">
                  {(dataFields?.og_image?.name || clearImage.og) && (
                    <div style={{ paddingBottom: "10px" }}>
                      <span>{dataFields?.og_image?.name?.name}</span>
                    </div>
                  )}
                  <div>
                    <label htmlFor="contained-button-file-og">
                      <input
                        id="contained-button-file-og"
                        type="file"
                        style={{ display: "none" }}
                        accept=".svg, .png, .jpeg, .jpg, .webp"
                        onChange={handleOgImageChange}
                        name="og image"
                      />
                      <span className="editContentFileButton" name="og image">
                        Select an Image File og
                      </span>
                    </label>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <FileUploader
                    multiple={false}
                    // label="Drop a file right here"
                    hoverTitle=""
                    handleChange={handleChangeDragDrop}
                    name="file"
                    types={fileTypes}
                    children={
                      <div>
                        <div className="drop_file_container">
                          <div className="drop_file_container_text">
                            <span>or</span> <br />
                            Drop a file here <br />
                            <CloudUploadOutlinedIcon />
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>

              <div className="editContentFilePreview">
                <div className="editContentFilePreviewCross">
                  {clearImage.og && (
                    <Tooltip title="Clear Image" placement="top">
                      <div>
                        <span
                          style={{
                            color: `${isLightTheme ? "#363636" : "#FFFFFF"}`,
                            cursor: "pointer",
                          }}
                        >
                          <CancelIcon
                            onClick={handleClearImage}
                            name="og image"
                          />
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </div>
                <div
                  style={
                    dataFields.og_image.url ? { background: "transparent" } : {}
                  }
                  className="editContentFilePreviewImgContainer"
                >
                  {dataFields.og_image.url ? (
                    <Image
                      src={dataFields.og_image.url}
                      className=""
                      alt="topic-og-image"
                      width={240}
                      height={240}
                    />
                  ) : (
                    <span>Preview</span>
                  )}
                </div>
                {pngImageWarning.og && (
                  <div className="editContent_pngWarning">
                    This should be done in the frontend side ?
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid
            item
            lg={8}
            md={8}
            sm={12}
            xs={12}
            className="reactdraftcontainer"
          >
            <div className="widthautoclass">
              <div className="updatecontainerbutton">
                {!isLoading && (
                  <button
                    type="button"
                    onClick={handleCleanHtml}
                    className="update_button_new"
                  >
                    Clean Html
                  </button>
                )}
                {isLoading ? (
                  <Box
                    className="loginbuttontext"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <CircularProgress color="inherit" size={30} />
                  </Box>
                ) : (
                  <button type="submit" className="update_button_new">
                    {topicId === "new" ? "Add" : "Update"}
                  </button>
                )}
                {!isLoading && (
                  <button
                    type="button"
                    onClick={onFixSpaces}
                    className="update_button_new"
                  >
                    Space Fixer ({spaceWordsCount})
                  </button>
                )}
              </div>
              <div className="editormaincontainer">
                <p style={{ marginBlock: "10px" }}>
                  {!isLoading && (
                    <span
                      className={
                        isLightTheme
                          ? "addcategory_text_two"
                          : "addcategory_text"
                      }
                      style={{
                        paddingTop: "0",
                        color: "var(--text_primary)",
                      }}
                    >
                      Edit Main Content
                    </span>
                  )}
                </p>
                <div>
                  {CKEditorState.loaded && (
                    <Editor
                      value={CKEditorState.content}
                      onChange={(value) => handleEditorChange(value)}
                    />
                  )}
                </div>
                <p style={{ marginBlock: "10px" }}>
                  {!isLoading && (
                    <span
                      className={
                        isLightTheme
                          ? "addcategory_text_two"
                          : "addcategory_text"
                      }
                      style={{
                        paddingTop: "0",
                        color: "var(--text_primary)",
                      }}
                    >
                      Edit FAQ Content
                    </span>
                  )}{" "}
                </p>

                <div>
                  {faqEditor.loaded && (
                    <Editor
                      value={faqEditor.content}
                      onChange={(value) => handleFaqChange(value)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </form>

      <div className="editContentFooterContainer">
        <CoursesFooter className="mt-16" courseId={courseId} />
      </div>
    </>
  );
};

export default AddTopic;
