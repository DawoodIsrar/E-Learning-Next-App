function Icon({ width = "", height = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 25 24"
    >
      <path
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M22.5 9l-6 6m0-6l6 6M10.134 5.366L6.97 8.53c-.173.173-.26.26-.36.322a1 1 0 01-.29.12C6.204 9 6.082 9 5.837 9H4.1c-.56 0-.84 0-1.054.109a1 1 0 00-.437.437C2.5 9.76 2.5 10.04 2.5 10.6v2.8c0 .56 0 .84.109 1.054a1 1 0 00.437.437C3.26 15 3.54 15 4.1 15h1.737c.245 0 .367 0 .482.028a1 1 0 01.29.12c.1.061.187.148.36.32l3.165 3.166c.429.429.643.643.827.657a.5.5 0 00.42-.174c.119-.14.119-.443.119-1.048V5.93c0-.606 0-.908-.12-1.049a.5.5 0 00-.42-.173c-.183.014-.397.228-.826.657z"
      ></path>
    </svg>
  );
}

export default Icon;
