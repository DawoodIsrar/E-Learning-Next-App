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
        strokeWidth="2"
        d="M14.25 13.448c0-.716 0-1.074.15-1.274a.75.75 0 01.547-.298c.249-.018.55.175 1.152.563l7.08 4.552c.523.335.785.503.875.717a.75.75 0 010 .584c-.09.213-.352.381-.874.717l-7.081 4.552c-.602.388-.903.581-1.152.563a.75.75 0 01-.547-.298c-.15-.2-.15-.558-.15-1.274v-9.104z"
      ></path>
      <path
        stroke="var(--background_peek_contrast)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.5 11.7c0-2.52 0-3.78.49-4.743A4.5 4.5 0 016.957 4.99C7.92 4.5 9.18 4.5 11.7 4.5h12.6c2.52 0 3.78 0 4.743.49a4.5 4.5 0 011.966 1.967c.491.963.491 2.223.491 4.743v12.6c0 2.52 0 3.78-.49 4.743a4.5 4.5 0 01-1.967 1.966c-.963.491-2.223.491-4.743.491H11.7c-2.52 0-3.78 0-4.743-.49a4.5 4.5 0 01-1.967-1.967C4.5 28.08 4.5 26.82 4.5 24.3V11.7z"
      ></path>
    </svg>
  );
}

export default Icon;
