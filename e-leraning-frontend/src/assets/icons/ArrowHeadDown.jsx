function Icon({ width = "24", height = "24", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 14 8"
    >
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1l6 6 6-6"
      ></path>
    </svg>
  );
}

export default Icon;
