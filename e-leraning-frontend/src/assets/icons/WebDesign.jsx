function Icon({ className = "", width = "48", height = "48" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#4DBFCE" />
      <path
        d="M21 23.2222L24.7778 27M19.9748 32.9749C18.608 34.3417 16 34 14 34C15.0251 32 13.6583 29.392 15.0251 28.0251C16.3919 26.6583 18.608 26.6583 19.9748 28.0251C21.3417 29.392 21.3417 31.608 19.9748 32.9749ZM23.9216 27.9246L33.0587 18.0565C33.8635 17.1874 33.8375 15.8376 32.9999 15C32.1624 14.1624 30.8126 14.1364 29.9434 14.9412L20.0753 24.0783C19.5654 24.5505 19.3104 24.7866 19.1617 25.0384C18.8051 25.6421 18.7908 26.3885 19.1239 27.0056C19.2628 27.2629 19.5085 27.5086 19.9999 28C20.4914 28.4914 20.7371 28.7371 20.9944 28.876C21.6114 29.2091 22.3578 29.1948 22.9616 28.8382C23.2134 28.6895 23.4494 28.4345 23.9216 27.9246Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default Icon;
