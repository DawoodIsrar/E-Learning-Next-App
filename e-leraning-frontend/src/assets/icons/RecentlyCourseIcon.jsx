function Icon({ width = "24", height = "24", className = "" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.7 9.5L18.7005 11.5L16.7 9.5M18.9451 11C18.9814 10.6717 19 10.338 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C12.8273 19 15.35 17.6963 17 15.6573M10 5V10L13 12"
        stroke="var(--text_primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Icon;
