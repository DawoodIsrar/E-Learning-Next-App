"use client";
import React, { useEffect } from "react";
import useAccordion from "./useAccordion";
import "./style.scss";

const EventBinder = ({ secondaryColor }) => {
  const { bindEvents } = useAccordion({ secondaryColor });
  useEffect(() => {
    bindEvents();
  }, [bindEvents]);

  return <></>;
};

export default EventBinder;
