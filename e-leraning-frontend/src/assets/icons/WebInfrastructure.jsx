function Icon({ className = "", width = "24", height = "24" }) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#CCBA19" />
      <path
        d="M31 21C31 24.866 27.866 28 24 28M31 21C31 17.134 27.866 14 24 14M31 21H17M24 28C20.134 28 17 24.866 17 21M24 28C25.7509 26.0832 26.7468 23.5956 26.8009 21C26.7468 18.4044 25.7509 15.9168 24 14M24 28C22.2491 26.0832 21.255 23.5956 21.2009 21C21.255 18.4044 22.2491 15.9168 24 14M24 28V30M17 21C17 17.134 20.134 14 24 14M26 32C26 33.1046 25.1046 34 24 34C22.8954 34 22 33.1046 22 32M26 32C26 30.8954 25.1046 30 24 30M26 32H33M22 32C22 30.8954 22.8954 30 24 30M22 32H15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Icon;
