import searchIcon from "@/assets/images/searchIcon.png";
import Image from "next/image";
import CrossIcon from "@/assets/images/crossIcon.png";
import "./style.scss";

interface searchBar {
  setSearchBar: () => void;
}
const SearchModal = (props: searchBar) => {
  return (
    <div className="search-modal-wrapper">
      <div className="search-barr">
        <div className="search-inputt">
          <div className="search-wrapper">
            <Image src={searchIcon} alt="search-icon" />
            <input placeholder="Search for anything"></input>
          </div>

          <Image
            src={CrossIcon}
            width={10}
            height={10}
            alt="cross-icon"
            onClick={props.setSearchBar}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
