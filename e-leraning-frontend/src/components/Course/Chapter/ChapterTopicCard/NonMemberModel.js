import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MedalIcon from "@/assets/images/Medal.svg";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";
import Link from "next/link";
import "./MemberOnlyModal.scss";
import { usePathname } from "next/navigation";

const NonMemberModel = ({ showDialog, setShowDialog }) => {
  const pathname = usePathname();
  return (
    <Dialog
      open={showDialog}
      onClose={() => {
        setShowDialog(false);
      }}
      PaperProps={{
        sx: {
          width: "100%",
          m: 0,
        },
      }}
    >
      <div className="memberOnlyModal">
        <h3>This content is for members only.</h3>
        <div className="memberOnlyModal_iconContainer">
          <AccountCircleIcon />
          <Image loading="lazy" src={MedalIcon} alt="medal" />
        </div>
        <h3>Sign Up to become a member.</h3>
        <Link href={"/register"} className="signUp_btn">
          Sign Up
        </Link>
        <p>
          <small className="memberOnlyModal_endText">
            If you already have an account
            <br />
            <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
              Log In
            </Link>
          </small>
        </p>
      </div>
    </Dialog>
  );
};

export default NonMemberModel;
