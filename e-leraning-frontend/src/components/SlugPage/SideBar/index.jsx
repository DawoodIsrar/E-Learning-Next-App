"use client";
import ModalCrossIcon from "@/assets/icons/ModalCrossIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.scss";

const SideBar = ({ data, setShowSideBar, showSideBar }) => {
  const pathname = usePathname();

  return (
    <>
      {showSideBar && (
        <div id="myModal" className="modal-terms">
          <div className="nav-menu-terms">
            <div className="menu-dropdown-wrapper-terms">
              <div className="menu-cross-icon-terms">
                <button
                  className="cross-button-terms"
                  onClick={() => {
                    setShowSideBar(false);
                  }}
                >
                  <ModalCrossIcon width="16" height="16" />
                </button>
              </div>
              <ul className="list-style-side">
                {data.map((item, index) => (
                  <li className="list-item-side" key={index}>
                    <Link
                      key={item?.id}
                      href={`/${item?.slug}`}
                      className={`li-link-side
                ${pathname.includes(item?.slug) ? "selected" : ""}`}
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
