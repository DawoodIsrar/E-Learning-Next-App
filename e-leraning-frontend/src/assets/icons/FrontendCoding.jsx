function Icon({ className = "", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      fill="none"
      viewBox="0 0 48 48"
    >
      <rect width="48" height="48" fill="#E95556" rx="24"></rect>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M34 21H14m12 8.5l2.5-2.5-2.5-2.5m-4 0L19.5 27l2.5 2.5m-8-9.7v8.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C16.28 33 17.12 33 18.8 33h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C34 30.72 34 29.88 34 28.2v-8.4c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C31.72 15 30.88 15 29.2 15H18.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C14 17.28 14 18.12 14 19.8z"
      ></path>
    </svg>
  );
}

export default Icon;
