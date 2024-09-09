function Icon({ width = "24", height = "24", className = "", isOpen }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      className={className}
      style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
      viewBox="0 0 32 32"
    >
      <rect
        width="32"
        height="32"
        fill="var(--background_secondary)"
        rx="16"
      ></rect>
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 13.5l5 5 5-5"
      ></path>
    </svg>
  );
}

export default Icon;
