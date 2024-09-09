"use client";
import Bookmark from "./Bookmark";
import { useSession } from "next-auth/react";

const BookmarkWrapper = ({
  topicId,
  bookmarkValue = {},
  onBookmarkChanged = {},
}) => {
  const { status } = useSession();
  const isAuthenticatedUser = status === "authenticated";

  return (
    <>
      {isAuthenticatedUser ? (
        <Bookmark
          onBookmarkChanged={onBookmarkChanged}
          topicId={topicId}
          bookmarkValue={bookmarkValue}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default BookmarkWrapper;
