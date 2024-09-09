function Icon({ width = "24", height = "24", id }) {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        id={id}
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.5 15l5-5-5-5"
      ></path>
    </svg>
  );
}

export default Icon;
