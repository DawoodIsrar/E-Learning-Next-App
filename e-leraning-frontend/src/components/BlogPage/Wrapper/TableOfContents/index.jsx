"use client";
import React, { useEffect, useState } from "react";
import BlogFBLogo from "@/assets/icons/BlogFBLogo";
import BlogMailLogo from "@/assets/icons/BlogMailLogo";
import BlogTwitterLogo from "@/assets/icons/BlogTwitterLogo";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import "./style.scss";

const TableOfContents = ({ postContentId }) => {
  const [headings, setHeadings] = useState([]);
  const params = useSearchParams();
  const pathname = usePathname();
  const id = params.get("id");
  const shareUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}${pathname}`;
  const emailSubject = "Check out this blog post!";
  const emailBody = `I found this interesting blog post and thought you might like it: ${shareUrl}`;
  const convertHeadingInSlug = (originalString) => {
    return originalString
      .toLowerCase()
      .replace(/:/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleScroll = (e) => {
    const id = convertHeadingInSlug(e.target.textContent);
    const newUrl = `${window.location.pathname}?id=${id}`;
    window.history.replaceState(null, null, newUrl);
    scrollToElement(id);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetTop = elementPosition - 100; // Adjust the offset as needed

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    } else {
      console.log(`Element with id "${id}" not found.`);
    }
  };

  useEffect(() => {
    const postContentElement = document.getElementById(postContentId);
    if (postContentElement) {
      const h2Elements = postContentElement.querySelectorAll("h2");
      const updatedHeadings = Array.from(h2Elements).map((h2) => {
        const headingText = h2.textContent;
        const slug = convertHeadingInSlug(headingText);
        h2.id = slug;
        return headingText;
      });
      setHeadings(updatedHeadings);
    }
  }, [postContentId]);

  useEffect(() => {
    if (id) {
      scrollToElement(id);
    }
  }, [id]);

  return (
    <div className="main-table-of-content-wrapper">
      <div className="table-of-content-wrapper">
        {!!headings.length && (
          <div className="table-body">
            <p className="table-heading">TABLE OF CONTENTS</p>
            {headings.map((heading, index) => (
              <p
                onClick={handleScroll}
                key={index}
                className={
                  convertHeadingInSlug(heading) === id ? "active-content" : ""
                }
              >
                {heading}
              </p>
            ))}
          </div>
        )}

        <div className="share-button">
          <p>Share</p>
          <div className="share-btns">
            <Link
              href={`https://www.twitter.com/share?url=${process.env.NEXT_PUBLIC_AUTH_URL}${pathname}`}
              target="_blank"
            >
              <BlogTwitterLogo />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_AUTH_URL}${pathname}`}
              target="_blank"
            >
              <BlogFBLogo />
            </Link>
            <Link
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
                emailSubject
              )}&body=${encodeURIComponent(emailBody)}`}
              target="_blank"
            >
              <BlogMailLogo />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
