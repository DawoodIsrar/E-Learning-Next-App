function Icon(width = "16", height = "16") {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="#000"
        d="M2.667 8.666a.667.667 0 100-1.333.667.667 0 000 1.333zM2.667 4.666a.667.667 0 100-1.333.667.667 0 000 1.333zM2.667 12.666a.667.667 0 100-1.333.667.667 0 000 1.333z"
      ></path>
      <path
        stroke="var(--text_primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 8H6m8-4H6m8 8H6M3.333 8A.667.667 0 112 8a.667.667 0 011.333 0zm0-4A.667.667 0 112 4a.667.667 0 011.333 0zm0 8A.667.667 0 112 12a.667.667 0 011.333 0z"
      ></path>
    </svg>
  );
}

export default Icon;
