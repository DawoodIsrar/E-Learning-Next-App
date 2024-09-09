import StructuredData from "@/components/Layout/Wrapper/StructuredData";
import "@/assets/scss/nprogress.scss";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = ({ children }) => {
  return <StructuredData>{children}</StructuredData>;
};

export default RootLayout;
