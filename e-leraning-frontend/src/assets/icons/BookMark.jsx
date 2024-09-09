function Icon({
  width = "24",
  height = "24",
  className = "",
  color = "none",
  stroke = "#000",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 7.8c0-1.68 0-2.52.327-3.162a3 3 0 011.311-1.311C7.28 3 8.12 3 9.8 3h4.4c1.68 0 2.52 0 3.162.327a3 3 0 011.311 1.311C19 5.28 19 6.12 19 7.8V21l-7-4-7 4V7.8z"
      ></path>
    </svg>
  );
}

export default Icon;
