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
        d="M10 10.834a.833.833 0 100-1.667.833.833 0 000 1.667zM15.834 10.834a.833.833 0 100-1.667.833.833 0 000 1.667zM4.167 10.834a.833.833 0 100-1.667.833.833 0 000 1.667z"
      ></path>
    </svg>
  );
}

export default Icon;
