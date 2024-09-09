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
        stroke="#fff"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M13 12.2v1h2.752l-.106.5H13V21h-1v-7.2h-2v-.5h2V9c0-1.148.852-2 2-2h2v1h-1.7a1.3 1.3 0 00-.932.368A1.3 1.3 0 0013 9.3v2.9z"
      ></path>
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
