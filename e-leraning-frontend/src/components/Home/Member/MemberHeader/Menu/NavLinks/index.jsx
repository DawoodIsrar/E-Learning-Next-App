import "./style.scss";

const NavLinks = ({ title, id, isActive, className, onClick, LinkIcon }) => {
  return (
    <div
      className={` g-10 ${className} ${isActive ? "active-button" : ""}`}
      aria-pressed={isActive}
      onClick={onClick}
    >
      {typeof LinkIcon === "function" ? (
        <LinkIcon />
      ) : (
        // <Image src={LinkIcon} width={20} height={20} />
        <LinkIcon />
      )}

      <p>{title}</p>
    </div>
  );
};

export default NavLinks;
