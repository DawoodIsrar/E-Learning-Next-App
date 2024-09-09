function Icon({ width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M22.7 13.5l-2-2-2 2M21 12a9 9 0 11-1.245-4.57M12 7v5l3 2"
      ></path>
    </svg>
  );
}

export default Icon;
