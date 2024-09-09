function Icon({ className, width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      fill="none"
      viewBox="0 0 36 36"
    >
      <path
        stroke="var(--background_peek_contrast)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 3a22.95 22.95 0 016 15 22.95 22.95 0 01-6 15m0-30a22.95 22.95 0 00-6 15 22.95 22.95 0 006 15m0-30C9.716 3 3 9.716 3 18c0 8.284 6.716 15 15 15m0-30c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15M3.75 13.5h28.5m-28.5 9h28.5"
      ></path>
    </svg>
  );
}

export default Icon;
