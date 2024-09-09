import WebDesgin from "@/assets/icons/WebDesign";
import frontendCoding from "@/assets/icons/FrontendCoding";
import backendCoding from "@/assets/icons/BackendCoding";
import webMarketing from "@/assets/icons/WebMarketing";
import webInfrastructure from "@/assets/icons/WebInfrastructure";
import bookIcon from "@/assets/icons/BookIcon";
import videoTutorialsIcon from "@/assets/icons/ChallengeVideoTutorialsIcon";
import onlineTutorialIcon from "@/assets/icons/ChallengeGlobeIcon";
import crossIcon from "@/assets/icons/CrossIcon";
import RichVisualContent from "@/assets/images/VisualLearning.svg";
import OutputFocusedContent from "@/assets/icons/PracticeAlongSIde";
import effortlessReview from "@/assets/images/EffortlessReview.svg";
import EasyToSearchContent from "@/assets/images/EasyToSearchContent.svg";
import CoodingTool from "@/assets/icons/Coding";
import { isProduction } from "./common";
import Eye from "@/assets/icons/Eye";
import BookOpen from "@/assets/icons/BookOpen";
import CourseMenuIcon from "@/assets/icons/CourseMenuIcon";

export const cardsData = [
  { title: "Web Design", Icon: WebDesgin },
  { title: "Frontend Development", Icon: frontendCoding },
  { title: "Backend Development", Icon: backendCoding },
  { title: "Coding Tools", Icon: CoodingTool },
  { title: "Digital Marketing", Icon: webMarketing },
  {
    title: "Web Infrastructure",
    Icon: webInfrastructure,
  },
];

export const explainerVideo = {
  mobile:
    "https://s3.eu-west-1.amazonaws.com/static.d-libro.com/10-app-embedded-content/video/d-libro-explainer-long-4x3-640x480.mp4",
  desktop:
    "https://s3.eu-west-1.amazonaws.com/static.d-libro.com/10-app-embedded-content/video/d-libro-explainer-long-4x3-1280x960.mp4",
};

export const learningChallengesData = [
  {
    Image: videoTutorialsIcon,
    Icon: crossIcon,
    heading: "Video Tutorials",
    paragraph: "Video tutorials can be hard and too fast to follow.",
    paragraphSub:
      "Struggling to pause, rewind, replay, and focus on specific sections makes learning frustrating.",
  },
  {
    Image: bookIcon,
    Icon: crossIcon,
    heading: "Books",
    paragraph:
      "Often focus on theory and lack clear, actionable steps for applying knowledge.",
    paragraphSub:
      "This makes translating textbook learning into real-world applications a challenge.",
  },
  {
    Image: onlineTutorialIcon,
    Icon: crossIcon,
    heading: "Online Tutorials",
    paragraph: "Tend to be long, text-heavy tutorials can be overwhelming.",
    paragraphSub:
      "Deciphering key points and setting up complex tools slows down your learning.",
  },
];

export const whyDlibroCards = [
  {
    title: "Visual Learning for Deeper Understanding",
    paragrapgh1:
      "Our courses use plenty of illustrations, diagrams, and other visual aids to present complex concepts clearly.",
    paragrapgh2:
      "This visual approach enhances understanding and helps you retain information long-term.",
    primaryImageComponent: RichVisualContent,
    altText: "visual-learning-img",
  },

  {
    title: "Practice Alongside Your Learning",
    paragrapgh1:
      " We provide hands-on practice materials, including code snippets, that you can copy and paste. ",
    paragrapgh2:
      " Experience the full web development journey, from simple concepts to complete applications, for truly practical learning.",
    primaryImageComponent: OutputFocusedContent,

    className: "output-focus-content",
    altText: "practice-alongside-img",
  },
  {
    title: "Effortless Review & Reference",
    paragrapgh1:
      "Bookmark topics for quick review, or revisit your browsing history complete with images to jog your memory.",
    paragrapgh2:
      "Our platform is designed for on-the-go learning, making it easy to access our guides and ebooks whenever and wherever you need them.",

    primaryImageComponent: effortlessReview,
    altText: "effortive-review-img",
  },

  {
    title: "Easy to Search Content",
    paragrapgh1: "Find what you need instantly.",
    paragrapgh2:
      "Our multi-scroll UI, search feature, and tagging system make it easy to find exactly the information you need.",
    primaryImageComponent: EasyToSearchContent,
    altText: "easy-to-search-content",
    // secondaryImage: highlySearchableContent2,
  },
];

export const MainPageFAQ = [
  {
    title: "What digital skills can I learn with D-Libro's ebooks?",
    value: "faq 1",
    faqs: [
      "D-Libro offers ebooks on a variety of in-demand digital skills, including web design, front-end coding (HTML, CSS, JavaScript), back-end coding (programming languages like Python), web marketing (SEO, social media), and web infrastructure (Cloud, Linux).",
    ],
  },
  {
    title: "Are D-Libro's ebooks for beginners or experienced learners?",
    value: "faq 2",
    faqs: [
      "D-Libro offers ebooks catering to both beginners and experienced learners. We have introductory ebooks that get you started with the basics, as well as more advanced ebooks that delve deeper into specific topics.",
    ],
  },
  {
    title: "What are the benefits of learning digital skills with ebooks?",
    value: "faq 3",
    faqs: [
      "Ebooks offer a convenient and affordable way to learn digital skills at your own pace. They're packed with information and resources, allowing you to learn from the comfort of your home.",
    ],
  },
  {
    title: "What will I learn in D-Libro's web design ebook?",
    value: "faq 4",
    faqs: [
      "Our web design ebook covers the fundamentals of web design, including user interface (UI) and user experience (UX) principles, layout and typography, and working with design tools like Figma or Adobe Software.",
    ],
  },
  {
    title:
      "I have no coding experience. Can I still learn front-end coding with D-Libro?",
    value: "faq 5",
    faqs: [
      "Absolutely! Our front-end coding ebook is designed for beginners, starting with the basics of HTML, CSS, and JavaScript. You'll learn how to build interactive web pages and gain the foundation for further coding exploration.",
    ],
  },
  {
    title: "What back-end coding languages does D-Libro's ebook cover?",
    value: "faq 6",
    faqs: [
      "The specific programming languages covered in our back-end coding ebook may vary depending on the edition. However, we often focus on popular languages like Python or JavaScript, which are versatile and in high demand.",
    ],
  },
  {
    title: "How much do D-Libro ebooks cost?",
    value: "faq 7",
    faqs: [
      "We believe access to digital skills education should be free! That's why we offer all our comprehensive ebooks completely free of charge. Start learning and mastering essential tech skills without any financial barriers.",
    ],
  },
  {
    title: "Do I need any equipment or software to use D-Libro's ebooks?",
    value: "faq 8",
    faqs: [
      "All you need is a computer, tablet, or device with internet access to read our ebooks. Some ebooks might recommend specific software for practice, but we'll always include free or accessible options as well.",
    ],
  },
  {
    title: "Can I learn at my own pace with D-Libro's ebooks?",
    value: "faq 9",
    faqs: [
      "Absolutely! One of the biggest advantages of ebooks is the flexibility. Learn on your own schedule, revisiting sections as needed, and mastering concepts at a pace that suits you.",
    ],
  },
  {
    title: "How long does it take to learn a new digital skill with D-Libro?",
    value: "faq 10",
    faqs: [
      "The time it takes depends on the skill, the ebook's depth, and your dedication. Our ebooks are designed for steady progress, with focused chapters that steadily build your knowledge.",
    ],
  },
  {
    title: "Do D-Libro ebooks include practical exercises and projects?",
    value: "faq 11",
    faqs: [
      "Yes! We believe in hands-on learning. Many of our ebooks include exercises, code-along sections, and projects to help you apply your knowledge and build skills confidently.",
    ],
  },
  {
    title: "Will I get a certificate after completing a D-Libro ebook?",
    value: "faq 12",
    faqs: [
      "While we might explore certification in the future, our current focus is on providing high-quality, accessible knowledge. The best proof of your skills will be the projects you create!",
    ],
  },
];

export const categoryTab = ["View All", "one", "two", "three", "four"];

export const NavLinks = [
  { title: "Recently Viewed", link: "/my-recently-viewed", LinkIcon: Eye },
  { title: "My Library", link: "/my-library", LinkIcon: BookOpen },
  { title: "Editor's Page", link: "/course-list", LinkIcon: CourseMenuIcon },
];

export const colorDivs = [
  {
    text: "1",
    color: "#e71d32",
  },
  {
    text: "2",
    color: "#9bd323",
  },
  {
    text: "3",
    color: "#feb62b",
  },
  {
    text: "4",
    color: "#dd8823",
  },
  {
    text: "5",
    color: "#26d24c",
  },
];

export const dataBlurUrl =
  "https://static-staging.d-libro.com/02-course-category-icon-cover/022-course-og-images/Screenshot_2024-06-20_at_8.48.19_PM_11zon.png";

export const homeStrucutedData = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Digital Book Library for Web Skill Training",
  url: "https://d-libro.com",
  potentialAction: [
    {
      "@type": "SearchAction",
      target:
        "https://www.d-libro.com/topic-search-result/?type=topic&query={searchQuery}",
      "query-input": "required name=searchQuery",
    },
  ],
};
export const FAQStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What digital skills can I learn with D-Libro's ebooks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "D-Libro offers ebooks on a variety of in-demand digital skills, including web design, front-end coding (HTML, CSS, JavaScript), back-end coding (programming languages like Python), web marketing (SEO, social media), and web infrastructure (Cloud, Linux).",
      },
    },
    {
      "@type": "Question",
      name: "Are D-Libro's ebooks for beginners or experienced learners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "D-Libro offers ebooks catering to both beginners and experienced learners. We have introductory ebooks that get you started with the basics, as well as more advanced ebooks that delve deeper into specific topics.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of learning digital skills with ebooks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ebooks offer a convenient and affordable way to learn digital skills at your own pace. They're packed with information and resources, allowing you to learn from the comfort of your home.",
      },
    },
    {
      "@type": "Question",
      name: "What will I learn in D-Libro's web design ebook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our web design ebook covers the fundamentals of web design, including user interface (UI) and user experience (UX) principles, layout and typography, and working with design tools like Figma or Adobe Software.",
      },
    },
    {
      "@type": "Question",
      name: "I have no coding experience. Can I still learn front-end coding with D-Libro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Our front-end coding ebook is designed for beginners, starting with the basics of HTML, CSS, and JavaScript. You'll learn how to build interactive web pages and gain the foundation for further coding exploration.",
      },
    },
    {
      "@type": "Question",
      name: "What back-end coding languages does D-Libro's ebook cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The specific programming languages covered in our back-end coding ebook may vary depending on the edition. However, we often focus on popular languages like Python or JavaScript, which are versatile and in high demand.",
      },
    },
    {
      "@type": "Question",
      name: "How much do D-Libro ebooks cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We believe access to digital skills education should be free! That's why we offer all our comprehensive ebooks completely free of charge. Start learning and mastering essential tech skills without any financial barriers.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need any equipment or software to use D-Libro's ebooks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All you need is a computer, tablet, or device with internet access to read our ebooks. Some ebooks might recommend specific software for practice, but we'll always include free or accessible options as well.",
      },
    },
    {
      "@type": "Question",
      name: "Can I learn at my own pace with D-Libro's ebooks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! One of the biggest advantages of ebooks is the flexibility. Learn on your own schedule, revisiting sections as needed, and mastering concepts at a pace that suits you.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to learn a new digital skill with D-Libro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The time it takes depends on the skill, the ebook's depth, and your dedication. Our ebooks are designed for steady progress, with focused chapters that steadily build your knowledge.",
      },
    },
    {
      "@type": "Question",
      name: "Do D-Libro ebooks include practical exercises and projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We believe in hands-on learning. Many of our ebooks include exercises, code-along sections, and projects to help you apply your knowledge and build skills confidently.",
      },
    },
    {
      "@type": "Question",
      name: "Will I get a certificate after completing a D-Libro ebook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While we might explore certification in the future, our current focus is on providing high-quality, accessible knowledge. The best proof of your skills will be the projects you create!",
      },
    },
  ],
};
export const soft404Urls = [
  "/course/sudo-run-command-with-superuser-privileges/",
  "/course/what-are-website-performance-and-page-experience/",
  "/course/normal-mode-4-undo-and-redo/",
  "/course/rmdir-remove-directory/",
  "/course/switch-current-branch-2-git-switch/",
  "/course/what-are-user-group-and-permission-in-linux/",
  "/course/chapter-2-search-engines-and-ranking-algorithm/",
  "/course/embed-images-img/",
  "/course/foreground-and-background-jobs/",
  "/course/implementing-seo/",
  "/course/git-user-settings-git-config/",
  "/course/static-files-in-development-environment-static-tag/",
  "/course/201110/",
  "/course/head-and-index/",
  "/course/key-steps-of-django-app-deployment/",
  "/course/django-production-settings-2-production-settings/",
  "/course/why-do-you-need-seo-tools/",
  "/course/key-design-points-by-css/",
  "/course-guide/Git--GitHub-Introduction/",
  "/course/undefined/",
  "/course-guide/Git--GitHub-Introduction/",
  "/course-guide/Linux-OS-Introduction/",
  "/course/check-status-of-working-tree-and-staging-area-git-status/",
  "/course/django-templates-for-crud-views/",
  "/course/technical-seo-why-is-technical-seo-important/",
  "/course/web-app-vs-website/",
  "/course/nested-flex-box/",
  "/course/html-element/",
  "/course/github-access-authentication-settings/",
  "/course/web-server/",
  "/course/visual-mode/",
  "/course/static_url-and-staticfiles_dirs/",
  "/course/ssh-config-file/",
  "/course/radio-button-and-checkbox/",
  "/course/line-break-br/",
  "/course/django-models-field-options/",
  "/course-guide/HTML-CSS-Introduction/",
  "/course/buttons/",
  "/course/building-websites-frontend-and-backend-coding/",
  "/course/chapter-4-create-crud-web-application/",
  "/course/alias-create-command-shortcuts/",
  "/course-guide/Linux-OS-Introduction/",
  "/course/link-tag-link/",
  "/course/footer-and-bottom-bar/",
  "/course-guide/HTML-CSS-Introduction/",
  "/course/insert-mode/",
  "/course/301110_Django-Introduction/",
  "/course/chapter-1-seo-foundation/",
  "/course/css-box-model/",
  "/course/create-text-input-forms-and-submit-button/",
];

export const centralizeAdsComponents = [
  "HomePageATF",
  "HomePageSecondHorizontal",
  "CourseOutlineATF",
  "CourseOutlineAdSecond",
  "CourseOutlineAdThird",
  "TopicPageInArticleInContentEnd",
];

export const returnAdsenseRecovery = () => {
  return (
    isProduction && (
      <script
        async
        src="https://fundingchoicesmessages.google.com/i/pub-4131796306735122?ers=1"
        nonce="O2e-dr-exWI-gJuz83Sg4g"
      ></script>
    )
  );
};

export const blogCategories = [
  { name: "View all", link: "/blogs/" },
  { name: "Digital Marketing", link: "/blog-category/digital-marketing/" },
  {
    name: "Frontend Development",
    link: "/blog-category/front-end-development/",
  },
  { name: "Backend Development", link: "/blog-category/back-end-development/" },
  { name: "Coding Tools", link: "/blog-category/coding-tools/" },
  {
    name: "Digital Infrastructure",
    link: "/blog-category/digital-infrastructure",
  },
  { name: "Web Design", link: "/blog-category/web-design" },
];
