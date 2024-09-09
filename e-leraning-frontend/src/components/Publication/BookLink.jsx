"use client";
import React from "react";
import Link from "next/link";

const BookLink = ({ bookUrl, children }) => {
  return (
    <Link
      onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
      rel="noopener"
      href={bookUrl}
      target="__blank"
    >
      {children}
    </Link>
  );
};

export default BookLink;
