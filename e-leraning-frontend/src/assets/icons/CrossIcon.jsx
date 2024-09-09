function Icon({ className, width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect width="30" height="30" x="1" y="1" fill="#E95555" rx="15"></rect>
      <rect
        width="30"
        height="30"
        x="1"
        y="1"
        stroke="#fff"
        strokeWidth="2"
        rx="15"
      ></rect>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 11L11 21m0-10l10 10"
      ></path>
    </svg>
  );
}

export default Icon;
