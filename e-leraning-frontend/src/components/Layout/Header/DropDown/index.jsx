"use client";
import { useState, useRef, useEffect } from "react";
import LightModeIcon from "@/assets/icons/LightModeIcon";
import MoonMode from "@/assets/icons/Moon";
import { useClickOutside } from "@/utils";
import "./style.scss";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState();
  const isDark = theme === "dark";

  const toggleTheme = (_theme) => {
    if (typeof window !== "undefined") {
      window.__setPreferredTheme(_theme);
    }
    setTheme(_theme);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(window.__theme);
    }
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (e) => {
    toggleTheme(e.currentTarget.id);
    toggleOpen();
  };

  useClickOutside(dropdownRef, () => {
    setOpen(false);
  });

  return (
    <div className="dropdown" onClick={toggleOpen} ref={dropdownRef}>
      {!isDark ? (
        <LightModeIcon width="16" height="16" />
      ) : (
        <MoonMode width="16" height="16" />
      )}
      {open && (
        <ul className="dropdown-menu">
          <li
            key="light-mode"
            className="menu-item"
            id="light"
            onClick={handleClick}
          >
            <div>
              <LightModeIcon width="14" height="14" />
              <p>light mode</p>
            </div>
          </li>
          <li
            key="dark-mode"
            id="dark"
            className="menu-item"
            onClick={handleClick}
          >
            <div>
              <MoonMode width="14" height="14" />
              <p> dark mode</p>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
