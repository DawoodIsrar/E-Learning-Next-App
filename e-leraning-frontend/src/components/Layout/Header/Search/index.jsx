"use client";
import SearchBarIcon from "@/assets/icons/SearchBarIcon";
import SearchModal from "@/components/SearchModal";
import { useClickOutside } from "@/utils";
import { useRef, useState } from "react";
import "./style.scss";

const SearchBox = ({ sectionClassName, sectionInputClassName, handleMenu }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const searchModalRef = useRef();

  useClickOutside(searchModalRef, () => {
    setShowSearchModal(false);
  });
  const removeAttribute = (e) => {
    e.currentTarget.removeAttribute("readonly");
  };

  return (
    <div className={`${sectionClassName} `}>
      <SearchBarIcon width={18} height={18} />
      <input
        type="text"
        placeholder="Search"
        onTouchStart={removeAttribute}
        onFocus={removeAttribute}
        className={`${sectionInputClassName}`}
        onClick={() => {
          setShowSearchModal(true);
        }}
      />
      {showSearchModal && (
        <SearchModal
          handleMenu={handleMenu}
          ref={searchModalRef}
          setSearchModalOpen={setShowSearchModal}
        />
      )}
    </div>
  );
};

export default SearchBox;
