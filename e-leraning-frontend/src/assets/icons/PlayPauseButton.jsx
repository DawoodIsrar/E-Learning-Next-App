function Icon({ className = "", width = "24", height = "24" }) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="white" />
      <rect
        x="0.5"
        y="0.5"
        width="79"
        height="79"
        rx="39.5"
        stroke="black"
        strokeOpacity="0.2"
      />
      <path
        d="M35 32.9895C35 32.0183 35 31.5328 35.2025 31.2651C35.3789 31.0319 35.6485 30.8876 35.9404 30.8702C36.2754 30.8502 36.6795 31.1195 37.4875 31.6582L48.0031 38.6686C48.6708 39.1137 49.0046 39.3363 49.1209 39.6168C49.2227 39.8621 49.2227 40.1377 49.1209 40.383C49.0046 40.6635 48.6708 40.886 48.0031 41.3312L37.4875 48.3415C36.6795 48.8802 36.2754 49.1496 35.9404 49.1296C35.6485 49.1122 35.3789 48.9679 35.2025 48.7347C35 48.467 35 47.9814 35 47.0103V32.9895Z"
        fill="black"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Icon;
