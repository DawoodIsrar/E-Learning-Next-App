const AccordianIcon = ({ handleIconClick, iconColor, className }) => {
  return (
    <div className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleIconClick}
      >
        <path
          d="M4 9L8 13L12 9"
          stroke="var(--text_primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default AccordianIcon;
