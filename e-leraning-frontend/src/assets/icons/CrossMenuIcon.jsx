function Icon({ width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 5L5 15M5 5l10 10"
      ></path>
    </svg>
  );
}

export default Icon;
