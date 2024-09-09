import CrossRedIcon from "@/assets/images/CrossRed.svg";
import ChapterIcon from "@/assets/images/ChapterIcon.svg";

import "./ChapterDeleteModal.scss";
import Image from "next/image";
import Modal from "../Modal";

const ChapterDeleteModal = ({ isOpen, setIsOpen }) => {
  const isLightTheme = "light";

  const handleBack = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={`chapterDeleteModal ${
          isLightTheme ? "chapterDeleteModal_light" : ""
        }`}
      >
        <div className="chapterDeleteModal_icon">
          <Image src={ChapterIcon} alt="chapter icon" />
          <Image src={CrossRedIcon} alt="chapter cross red icon" />
        </div>
        <div className="chapterDeleteModal_text">
          You cannot delete <b> this chapter</b>.
        </div>
        <div className="chapterDeleteModal_text">
          You have <b> topics </b> under <b> this chapter</b>.
        </div>
        <div className="chapterDeleteModal_text">
          Delete or move all topics under this chapter before deleting this
          chapter.
        </div>
        <button onClick={handleBack}>Back</button>
      </div>
    </Modal>
  );
};

export default ChapterDeleteModal;
