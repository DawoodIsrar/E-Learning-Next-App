import { isProduction } from "@/utils/common";

export const generateMetaTags = (
  title,
  description,
  keywords,
  metaDescription,
  route,
  imgUrl
) => {
  return {
    title: !title
      ? "D-Libro | Digital Book Library for Web Skill Training"
      : route.includes("topic") ||
        route.includes("course") ||
        route.includes("blog")
      ? title
      : route.includes("tagPage")
      ? `${title} - D-Libro`
      : `${title} - D-Libro | Digital Book Library for Web Skill Training`,
    description: description,
    keywords: keywords,

    openGraph: {
      title: !title
        ? "D-Libro | Digital Book Library for Web Skill Training"
        : route.includes("topic") ||
          route.includes("course") ||
          route.includes("blog")
        ? title
        : route.includes("tagPage")
        ? `${title} - D-Libro`
        : `${title} - D-Libro | Digital Book Library for Web Skill Training`,
      description: metaDescription,
      siteName: !title
        ? "D-Libro | Digital Book Library for Web Skill Training"
        : route.includes("topic") ||
          route.includes("course") ||
          route.includes("blog")
        ? title
        : route.includes("tagPage")
        ? `${title} - D-Libro`
        : `${title} - D-Libro | Digital Book Library for Web Skill Training`,
      images: {
        url: imgUrl,
        width: process.env.NEXT_PUBLIC_OG_IMAGE_WIDTH,
        height: process.env.NEXT_PUBLIC_OG_IMAGE_HEIGHT,
      },
      url: `${process.env.NEXTAUTH_URL}/${route}/`,
      type: "website",
    },
    twitter: {
      title: !title
        ? "D-Libro | Digital Book Library for Web Skill Training"
        : route.includes("topic") ||
          route.includes("course") ||
          route.includes("blog")
        ? title
        : route.includes("tagPage")
        ? `${title} - D-Libro`
        : `${title} - D-Libro | Digital Book Library for Web Skill Training`,
      description: metaDescription,
      siteName: !title
        ? "D-Libro | Digital Book Library for Web Skill Training"
        : route.includes("topic") ||
          route.includes("course") ||
          route.includes("blog")
        ? title
        : route.includes("tagPage")
        ? `${title} - D-Libro`
        : `${title} - D-Libro | Digital Book Library for Web Skill Training`,
      images: {
        url: imgUrl,
        width: process.env.NEXT_PUBLIC_OG_IMAGE_WIDTH,
        height: process.env.NEXT_PUBLIC_OG_IMAGE_HEIGHT,
      },
      url: `${process.env.NEXTAUTH_URL}/${route}/`,
      type: "website",
      card: "summary_large_image",
    },
    metadataBase: new URL(process.env.NEXTAUTH_URL),
    alternates: {
      canonical: `/${route}/`,
    },
    robots: {
      index: isProduction,
      follow: isProduction,
    },
  };
};

export const aboutMetaData = generateMetaTags(
  "About",
  "D-Libro offers extensive digital skills training. Our platform includes courses to learn digital marketing, frontend and backend development, web design, and web infrastructure management.",
  "HTML, CSS, Git, GitHub, Linux, Django, Figma, Web application, Coding Tutorial",
  "A webbook-based learning content library for digital skill development",
  "about",
  "https://s3.eu-west-1.amazonaws.com/static.d-libro.com/02-course-category-icon-cover/landing-page-og-image.png"
);

export const homeMetaData = generateMetaTags(
  "",
  "Online web skill learning guide. From beginner to master of web design, coding, infrastructure operation, business development and marketing.",
  "HTML,CSS,Git,GitHub,Linux,Django,Figma,Web application,Coding Tutorial",
  "A webbook-based learning content library for digital skill development",
  "",
  "https://s3.eu-west-1.amazonaws.com/static.d-libro.com/02-course-category-icon-cover/landing-page-og-image.png"
);
