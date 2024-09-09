function Icon(width = "40", height = "40") {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M35 35l-7.25-7.25M18.333 10a8.333 8.333 0 018.334 8.333m5 0c0 7.364-5.97 13.334-13.334 13.334C10.97 31.667 5 25.697 5 18.333 5 10.97 10.97 5 18.333 5c7.364 0 13.334 5.97 13.334 13.333z"
      ></path>
    </svg>
  );
}

export default Icon;
