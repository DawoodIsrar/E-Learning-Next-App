import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { showAllBookmark } from "@/services/bookmark";

export const UserContext = createContext({});
const ContextProviders = ({ children }) => {
  const [userBookMarkList, setUserBookMarkList] = useState([]);

  const { data: session } = useSession();
  const role = session?.user?.role;
  const accessToken = session?.accessToken;

  const getUserBookmarkList = async () => {
    const data = await showAllBookmark(role, accessToken);
    setUserBookMarkList(data);
  };

  useEffect(() => {
    if (accessToken) {
      getUserBookmarkList();
    }
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ userBookMarkList }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProviders;
