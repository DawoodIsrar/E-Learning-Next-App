"use client";
import { useEffect, useState } from "react";
import { addBrowseRecordApi } from "@/services/post";
import { useSession } from "next-auth/react";
import "./style.scss";

const TopicScript = ({ topicId }) => {
  const [targetElementId, setTargetElementId] = useState("");

  const { data: session } = useSession();
  const user = session?.user;
  const accessToken = session?.accessToken;

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const scrollToTargetElement = () => {
    var element = document?.getElementById(targetElementId);
    var offset =
      element?.getBoundingClientRect()?.top +
      element?.getBoundingClientRect()?.height -
      65; // - 65 is to uncover the element from navbar

    // Check if the element is already in view
    if (offset < 0 || offset > window?.innerHeight) {
      // Scroll to that position
      window?.scrollTo({
        top:
          offset -
          element?.getBoundingClientRect()?.height -
          element?.getBoundingClientRect()?.height / 2,
        behavior: "smooth", // Optional: for smooth scrolling
      });
    }
  };

  useEffect(() => {
    setTargetElementId(searchParams.get("id"));
    // Check if a scroll position was saved
    if (!targetElementId) {
      const savedScrollPosition = sessionStorage.getItem("scrollPosition");
      if (savedScrollPosition) {
        // Restore the scroll position
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: "smooth",
        });
      }
      // Clear the saved scroll position from session storage
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      addBrowseRecordApi({ role: user?.role, topic_id: topicId }, accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (targetElementId) {
      scrollToTargetElement();
    }
  }, [targetElementId]);

  return <></>;
};

export default TopicScript;
