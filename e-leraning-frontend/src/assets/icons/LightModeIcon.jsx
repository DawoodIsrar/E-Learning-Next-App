function Icon({ width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 1.333v1.334m0 10.666v1.334M2.667 8H1.334M4.21 4.21l-.943-.943m8.524.942l.943-.942M4.21 11.793l-.943.943m8.524-.943l.943.943M14.667 8h-1.333m-2 0a3.333 3.333 0 11-6.667 0 3.333 3.333 0 016.667 0z"
      ></path>
    </svg>
  );
}

export default Icon;
