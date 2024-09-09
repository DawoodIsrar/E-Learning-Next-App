"use client";
import BookmarkIcon from "@/assets/icons/BookMark";
import { toast } from "react-toastify";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { EditBookmark, addBookmark } from "@/services/bookmark";
import { useSession } from "next-auth/react";
import "./style.scss";
import { useState } from "react";

const BookmarkInputs = ({
  index,
  bookmark,
  setBookmark,
  deleteBookmarks,
  setAddnewDisabled,
}) => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteBookmark = async () => {
    deleteBookmarks(bookmark.id);
  };

  const handleEditBookmark = async () => {
    let response = {};
    try {
      if (bookmark?.id) {
        response = await EditBookmark(
          bookmark.id,
          bookmark.color,
          bookmark.name,
          session?.user?.role,
          session?.accessToken
        );

        if (response?.data?.status) {
          setBookmark(response.data.data);
          toast.success(response.message);
        }
      } else if (!isSubmitting) {
        setIsSubmitting(true);
        const data = new FormData();
        data.append("name", bookmark.name);
        data.append("color", bookmark.color);
        data.append("role", session?.user?.role);
        response = await addBookmark(data, session?.accessToken);
        setIsSubmitting(false);
      }

      if (response?.data) {
        setAddnewDisabled(false);
        setBookmark(response.data.data);
        setIsSubmitting(false);
      }

      if (response?.data?.status) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while processing your request.");
      console.error("Error in handleEditBookmark:", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (key) => (e) => {
    setBookmark({ ...bookmark, [key]: e?.target?.value });
  };

  const handleButtonClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id).click();
  };

  const handleBookmarkColor = (e) => {
    const index = e.currentTarget.getAttribute("data-index");
    handleButtonClick(e, `label-colorpicker-${parseInt(index)}`);
  };

  return (
    <div className="bookmark-container" id={index} key={index}>
      <div className="bookmark-input">
        <div className="color-selection-wrapper" onBlur={handleEditBookmark}>
          <div className="color-selection-container">
            <label
              id={`label-colorpicker-${index}`}
              for={`colorpicker-${index}`}
            ></label>
            <input
              type="color"
              value={bookmark?.color}
              onChange={handleChange("color")}
              className="color-input"
              id={`colorpicker-${index}`}
            />
            <button
              className="color-picker-button"
              data-index={parseInt(index)}
              onClick={handleBookmarkColor}
            >
              <BookmarkIcon color={bookmark?.color} />
            </button>
          </div>

          <input
            className="bookmark-input-field"
            name="name"
            placeholder="Bookmark Name"
            value={bookmark?.name}
            onChange={handleChange("name")}
            type="text"
          />
        </div>
        <button
          className="delete-bookmark-button"
          onClick={handleDeleteBookmark}
          disabled={!bookmark.id}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default BookmarkInputs;
