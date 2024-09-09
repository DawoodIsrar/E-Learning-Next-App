import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { deleteAccessTokenCookie, deleteAllCookies, deleteUserCookie } from "@/services/server-action-cookies";

function SessionChecker() {
    const { data: session } = useSession();
  
    useEffect(() => {
      const checkSession = async () => {
        if (session) {
          const currentDate = new Date();
          const expiresDate = new Date(session.expires);
  
          if (currentDate > expiresDate) {
            await deleteAccessTokenCookie();
            await deleteAllCookies();
            await deleteUserCookie();
            await signOut({callbackUrl:`${window.location}`,redirect:true });
          }
        }
      };
      checkSession();
  
      const interval = setInterval(checkSession, 60 * 1000);
  
      return () => clearInterval(interval);
    }, [session]);
  
    return null;
  }
  
  export default SessionChecker;