"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import ManageCookies from "@/components/ManageCookies";

import AppErrorFallback from "@/components/AppErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

import "@/assets/scss/index.scss";
import SessionChecker from "@/lib/sessionChecker";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import "./style.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FirstLoginModal from "../../FirstLoginModal";
import { isProduction } from "@/utils/common";
import RemoveAdsense from "@/components/common/RemoveAdsense";
import "@/assets/scss/global.scss";
import "@/components/Layout/Header/style.scss";
import ContextProviders from "./ContextProviders";
import PrismJsImports from "./PrimsJsImports";
import dynamic from "next/dynamic";
const AdsenseScript = dynamic(() => import("../AdsenseScript"), { ssr: false });
const ThemeScript = dynamic(() => import("@/lib/themeScript"), { ssr: false });
import AdsenseContextProvider from "@/contexts/adsenseContextProvider";
import { homeStrucutedData, FAQStructuredData } from "@/utils/data";

const inter = Inter({ subsets: ["latin"] });

const LayoutWrapper = ({ children, schema, modalState }) => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(modalState);
  const courseFeedbackPattern = /^\/course-feedback\/\d+\/$/;
  const chapterListPattern = /^\/chapter-list\/\d+\/$/;
  const addCoursePattern = /^\/add-chapter\/\d+\/new\/$/;
  const isEditorPage =
    pathname === "/course-list/" ||
    courseFeedbackPattern.test(pathname) ||
    chapterListPattern.test(pathname) ||
    addCoursePattern.test(pathname);

  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about/";

  const removeFooter = () => {
    const mainFooterWrapper = document.querySelector(".main-footer-wrapper");
    if (mainFooterWrapper) {
      mainFooterWrapper.style.display = "none";
    }
  };

  useEffect(() => {
    if (isEditorPage) {
      document.addEventListener("DOMContentLoaded", function () {});
      removeFooter(); // Call your function here
    }
  }, [isEditorPage, pathname]);

  useEffect(() => {
    if (!isEditorPage) {
      const targetDiv = document.querySelector(".main-footer-container");

      if (targetDiv) {
        // Intersection Observer
        const intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              //adding in-view class so i can scroll page to get topic menu in viewa
              targetDiv.classList.add("in-view");
            } else {
              //removing in-view class
              targetDiv.classList.remove("in-view");
            }
          });
        });

        intersectionObserver.observe(targetDiv);

        // Cleanup function to disconnect observers when the component is unmounted or dependencies change
        return () => {
          intersectionObserver.disconnect();
        };
      }
    }
  }, []);

  return (
    <SessionProvider
      refetchInterval={60}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      <AdsenseContextProvider>
        <ContextProviders>
          <html lang="en" suppressHydrationWarning>
            <head>
              {isHomePage && (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(homeStrucutedData, null, 2),
                  }}
                />
              )}
              {(isHomePage || isAboutPage) && (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(FAQStructuredData, null, 2),
                  }}
                />
              )}
              {isProduction && <AdsenseScript />}
              {schema && (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema, null, 2),
                  }}
                />
              )}
            </head>
            <body className={inter.className}>
              <NextTopLoader />
              <ThemeScript />
              <PrismJsImports />
              <ErrorBoundary
                fallbackRender={(fallbackProps) => {
                  return <AppErrorFallback {...fallbackProps} />;
                }}
              >
                <SessionChecker />
                {children}
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />

                {isProduction && (
                  <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
                )}
                {showModal === "true" && (
                  <FirstLoginModal setShowModal={setShowModal} />
                )}
                <ManageCookies />
                <RemoveAdsense />
              </ErrorBoundary>
            </body>
          </html>
        </ContextProviders>
      </AdsenseContextProvider>
    </SessionProvider>
  );
};

export default LayoutWrapper;
