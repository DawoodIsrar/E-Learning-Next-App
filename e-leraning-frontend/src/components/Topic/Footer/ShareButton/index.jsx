"use client";
import React, { useState, useEffect, useRef } from "react";
import ShareIcon from "@/assets/icons/Share";
import FacebookIcon from "@/assets/icons/FacebookTopicFooterIcon";
import TwitterIcon from "@/assets/icons/TwitterTopicFooterIcon";
import WhatsappIcon from "@/assets/icons/WhatsaapTopicFooterIcon";
import TelegramIcon from "@/assets/icons/TelegramTopicFooterIcon";
import "./style.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Index = ({ MobileView, authenticated }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className={`${!MobileView ? "icon" : "no-border"}`}
        onClick={toggleDropdown}
        aria-label={"share button"}
      >
        <ShareIcon width="24" height="24" />
      </button>

      <div className="share-drop-down" ref={dropdownRef}>
        {open && (
          <div className="share-dropdown-content">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_AUTH_URL}${pathname}`}
              target="_blank"
            >
              <FacebookIcon />
            </Link>
            <Link
              href={`https://www.twitter.com/share?url=${process.env.NEXT_PUBLIC_AUTH_URL}${pathname}`}
              target="_blank"
            >
              <TwitterIcon />
            </Link>
            <Link
              href={`https://api.whatsapp.com/send?text=${process.env.NEXT_PUBLIC_AUTH_URL}${pathname}`}
              target="_blank"
            >
              <WhatsappIcon />
            </Link>
            <Link
              href={`https://telegram.me/share/url?url=${process.env.NEXT_PUBLIC_AUTH_URL}${pathname}`}
              target="_blank"
            >
              <TelegramIcon />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
