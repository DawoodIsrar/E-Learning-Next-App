"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import { updateCourseEditorById, addCourseEditor } from "@/services/course";
import Link from "next/link";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CoursesFooter from "@/components/CoursesFooter";
const Editor = dynamic(() => import("@/components/common/CKEditor"), {
  ssr: false,
});
import { CourseAccessTitles } from "@/utils";

const CourseEdit = ({ data, categories, token, id }) => {
  const router = useRouter();
  const initialData = {
    unique_identifier: "",
    short_title: "",
    category_id: "",
    header_h1_title: "",
    header_description: "",
    meta_title: "",
    breadcrumb_name: "",
    course_slug: "",
    meta_description: "",
    primary_color: "#000000",
    secondary_color: "#000000",
    primary_icon: null,
    secondary_icon: null,
    // course_guide: "",
    schema_json: "",
    // popup_description: "",
    visibility_status: "",
    tags: "",
    header_image: "",
    og_image_url: "",
    og_image: null,
  };

  const [formData, setFormData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({
    unique_identifier: false,
    category_id: false,
    short_title: false,
    course_slug: false,
    // popup_description: false,
    meta_description: false,
  });
  const [popupDescription, setPopupDescription] = useState("");
  const [courseGuide, setCourseGuide] = useState("");

  useEffect(() => {
    const newData = {
      unique_identifier: data?.data?.unique_identifier || "",
      short_title: data?.data?.short_title || "",
      header_h1_title: data?.data?.header_h1_title || "",
      header_description: data?.data?.header_description || "",
      category_id: data?.data?.category?.id || "",
      meta_title: data?.data?.meta_title || "",
      breadcrumb_name: data?.data?.breadcrumb_name || "",
      course_slug: data?.data?.course_slug || "",
      meta_description: data?.data?.meta_description || "",
      primary_color: data?.data?.primary_color || "#000000",
      secondary_color: data?.data?.secondary_color || "#000000",
      primary_icon: data?.data?.primary_icon_url || "",
      secondary_icon: data?.data?.secondary_icon_url || "",
      // course_guide: data?.data?.course_guide || "",
      schema_json: data?.data?.schema_json || "",
      visibility_status: data?.data?.visibility_status || "",
      // popup_description: data?.data?.popup_description || "",
      tags: data?.data?.tags || "",
      header_image: data?.data?.header_image || "",
      og_image: data?.data?.og_image_url || "",
    };
    setFormData(newData);
    setOriginalData(newData);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.data.find(
        (category) => category.id === Number(value)
      );
      setFormData({
        ...formData,
        category_id: selectedCategory?.id,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleEditorChange = (name, value) => {
    if (name === "popup_description") {
      setPopupDescription(value.editor.getData());
    } else {
      setCourseGuide(value.editor.getData());
    }
    // setFormData({
    //   ...formData,
    //   [name]: value.editor.getData(),
    // });
  };

  const validateForm = () => {
    const requiredFields = [
      "unique_identifier",
      "category_id",
      "short_title",
      "course_slug",
      // "popup_description",
    ];
    let isValid = true;
    let newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        isValid = false;
      } else {
        newErrors[field] = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("id", id);
    for (const key in formData) {
      if (
        [
          "header_image",
          "og_image_url",
          "primary_icon",
          "secondary_icon",
        ].includes(key)
      ) {
        if (formData[key] instanceof File) {
          submissionData.append(key, formData[key]);
        }
      } else if (formData[key] !== originalData[key]) {
        submissionData.append(key, formData[key]);
      }
    }

    try {
      if (token && id) {
        submissionData.append("course_guide", courseGuide);
        submissionData.append("popup_description", popupDescription);
        const res = await updateCourseEditorById(token, submissionData);
        if (res?.error) {
          const field = Object.keys(res?.error)[0];

          const messages = res?.error[field];
          // Display each error message as a toast notification
          messages.forEach((message) => {
            toast.error(`${message}`);
          });
        } else {
          toast.success("Course updated successfully");
          router.push("/course-list");
        }
      } else {
        const res = await addCourseEditor(token, submissionData);
        if (res?.error) {
          const field = Object.keys(res?.error)[0];

          const messages = res?.error[field];
          // Display each error message as a toast notification
          messages.forEach((message) => {
            toast.error(`${message}`);
          });
        } else {
          toast.success("Course has been added successfully");
          router.push("/course-list");
        }
      }
    } catch (error) {
      toast.error("Failed to submit the form. Please try again later.");
    }
  };
  const handleColorChange = (e) => {
    const { name, value } = e.target;

    if (name === "primary_color") {
      setFormData({
        ...formData,
        primary_color: value,
        // primary_color_text: value,
      });
    } else if (name === "secondary_color") {
      setFormData({
        ...formData,
        secondary_color: value,
        // secondary_color_text: value,
      });
    }
  };

  const isFileUrl = (url) => {
    return (
      typeof url === "string" &&
      (url.startsWith("http://") || url.startsWith("https://"))
    );
  };

  return (
    <div className="course-edit-wrapper">
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
      <form onSubmit={handleSubmit} className="form-body">
        <div className="main-heading">
          <h1>{data ? "Update" : "Create"} Course</h1>
        </div>
        {data && <h3>Course Name: {data?.data?.short_title}</h3>}
        <div className="form-input">
          <label
            className={formErrors.unique_identifier ? "required-label" : ""}
          >
            Unique identifier:
          </label>
          <input
            type="number"
            name="unique_identifier"
            disabled={data}
            value={formData.unique_identifier}
            placeholder={formData?.unique_identifier}
            onChange={handleChange}
            className={formErrors.unique_identifier ? "required-field" : ""}
          />
          {formErrors.unique_identifier && (
            <p className="error-message">This field is required.</p>
          )}
        </div>
        <div className="form-input">
          <label className={formErrors.category_id ? "required-label" : ""}>
            Category:
          </label>
          <select
            name="category"
            value={formData.category_id}
            onChange={handleChange}
            className={formErrors.category_id ? "required-field" : ""}
          >
            <option disabled value="">
              Select a category
            </option>
            {categories?.data &&
              categories?.data.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          {formErrors.category_id && (
            <p className="error-message">This field is required.</p>
          )}
        </div>
        <div className="form-input">
          <label className={formErrors.short_title ? "required-label" : ""}>
            Short title:
          </label>
          <input
            type="text"
            name="short_title"
            value={formData.short_title}
            onChange={handleChange}
            className={formErrors.short_title ? "required-field" : ""}
          />
          {formErrors.short_title && (
            <p className="error-message">This field is required.</p>
          )}
        </div>
        <div className="form-input">
          <label>Header h1 title:</label>
          <input
            type="text"
            name="header_h1_title"
            value={formData.header_h1_title}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Meta title:</label>
          <input
            type="text"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Breadcrumb name:</label>
          <input
            type="text"
            name="breadcrumb_name"
            value={formData.breadcrumb_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label className={formErrors.course_slug ? "required-label" : ""}>
            Course slug:
          </label>
          <input
            type="text"
            name="course_slug"
            value={formData.course_slug}
            onChange={handleChange}
            className={formErrors.course_slug ? "required-field" : ""}
          />
          {formErrors.course_slug && (
            <p className="error-message">This field is required.</p>
          )}
        </div>
        <div className="form-input">
          <label>Header description:</label>
          <textarea
            name="header_description"
            value={formData.header_description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-input">
          <label>Header image:</label>
          <label>Current image</label>
          {isFileUrl(formData.header_image) ? (
            <Link href={formData.header_image} target="_blank">
              {formData.header_image}
            </Link>
          ) : (
            <p>{formData.header_image?.name}</p>
          )}
          <label>Change</label>
          <input type="file" name="header_image" onChange={handleFileChange} />
        </div>
        <div className="form-input">
          <label>Og image:</label>
          <label>Current image</label>
          {isFileUrl(formData.og_image) ? (
            <Link href={formData.og_image} target="_blank">
              {formData.og_image}
            </Link>
          ) : (
            <p>{formData.og_image?.name}</p>
          )}
          <label>Change</label>
          <input
            type="file"
            name="og_image"
            accept=".webp"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-input">
          <label>Primary color:</label>
          <div className="color-div">
            <input
              type="color"
              className="color-input"
              name="primary_color"
              value={formData.primary_color}
              onChange={handleColorChange}
            />
            <input
              type="text"
              className="color-input-text"
              name="primary_color"
              value={formData.primary_color}
              onChange={handleColorChange}
            />
          </div>
        </div>
        <div className="form-input">
          <label>Secondary color:</label>
          <div className="color-div">
            <input
              type="color"
              className="color-input"
              name="secondary_color"
              value={formData.secondary_color}
              onChange={handleColorChange}
            />
            <input
              type="text"
              className="color-input-text"
              name="secondary_color"
              value={formData.secondary_color}
              onChange={handleColorChange}
            />
          </div>
        </div>
        <div className="form-input">
          <label>Primary icon:</label>
          <label>Current image</label>
          {isFileUrl(formData.primary_icon) ? (
            <Link href={formData.primary_icon} target="_blank">
              {formData.primary_icon}
            </Link>
          ) : (
            <p>{formData.primary_icon?.name}</p>
          )}
          <label>Change</label>
          <input
            type="file"
            name="primary_icon"
            onChange={handleFileChange}
            accept=".svg"
          />
        </div>
        <div className="form-input">
          <label>Secondary icon:</label>
          <label>Current image</label>
          {isFileUrl(formData.secondary_icon) ? (
            <Link href={formData.secondary_icon} target="_blank">
              {formData.secondary_icon}
            </Link>
          ) : (
            <p>{formData.secondary_icon?.name}</p>
          )}
          <label>Change</label>
          <input
            type="file"
            name="secondary_icon"
            onChange={handleFileChange}
            accept=".svg, .webp"
          />
        </div>
        <div className="form-input">
          <label
            className={formErrors.popup_description ? "required-label" : ""}
          >
            Popup description:
          </label>
          <div className="editor-wrapper">
            <Editor
              className="ckeditor-tab"
              value={data?.data?.popup_description}
              onChange={(value) =>
                handleEditorChange("popup_description", value)
              }
            />
            {formErrors.popup_description && (
              <p className="error-message">This field is required.</p>
            )}
          </div>
        </div>
        <div className="form-input">
          <label>Meta description:</label>
          <textarea
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-input">
          <label>Course guide:</label>
          <div className="editor-wrapper">
            <Editor
              value={data?.data?.course_guide}
              onChange={(value) => handleEditorChange("course_guide", value)}
            />
          </div>
        </div>
        <div className="form-input">
          <label>Schema JSON:</label>
          <textarea
            name="schema_json"
            value={formData.schema_json}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-input">
          <label>Visibility status:</label>
          <select
            name="visibility_status"
            value={formData.visibility_status}
            onChange={handleChange}
          >
            {CourseAccessTitles.map((chapter, i) => (
              <option key={i} value={chapter.value}>
                {chapter.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-input">
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <button className="submit-btn" type="submit">
          {data ? "Save Course" : "Create Course"}
        </button>
      </form>
      <CoursesFooter className="mt-16" courseId={id} />
    </div>
  );
};

export default CourseEdit;
