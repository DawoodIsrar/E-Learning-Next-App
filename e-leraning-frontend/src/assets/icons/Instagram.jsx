function Icon({ width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="17.041" cy="6.042" r="1.375" fill="#fff"></circle>
      <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="2"></circle>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 22H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h6c5 0 7 2 7 7v6c0 5-2 7-7 7z"
      ></path>
    </svg>
  );
}

export default Icon;
