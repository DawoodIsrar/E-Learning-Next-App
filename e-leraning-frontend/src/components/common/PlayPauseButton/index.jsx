import PlayButtonImage from "@/assets/icons/PlayPauseButton";
import Image from "next/image";
import "./style.scss";

const PlayPauseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="play-button">
      <PlayButtonImage width="80" height="80" className={"play-btn"} />
    </button>
  );
};

export default PlayPauseButton;
