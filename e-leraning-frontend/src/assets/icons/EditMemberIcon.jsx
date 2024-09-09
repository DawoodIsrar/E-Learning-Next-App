function Icon({ width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 28 28"
    >
      <g
        fillRule="evenodd"
        clipRule="evenodd"
        filter="url(#filter0_d_6712_51137)"
      >
        <path
          fill="#BFE0FF"
          d="M18.486.945a3.233 3.233 0 014.568 0c.61.61.946 1.421.946 2.285 0 .863-.336 1.674-.946 2.283L21.266 7.3l-4.568-4.568L18.486.945zM5.103 14.328L15.327 4.104l4.57 4.568L9.671 18.896a.638.638 0 01-.33.177l-4.568.914-.127.013a.646.646 0 01-.634-.773l.913-4.57a.654.654 0 01.177-.329z"
        ></path>
        <path
          fill="#6EBAFF"
          d="M18.934 5.102l4.111-4.05c.616.607.955 1.414.955 2.273 0 .858-.34 1.665-.954 2.27l-1.805 1.779-2.307-2.272zM4 19.812L17.55 6.465l2.307 2.27L9.535 18.902a.648.648 0 01-.334.176l-4.611.909-.128.013A.658.658 0 014 19.812z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_6712_51137"
          width="28"
          height="28"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_6712_51137"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_6712_51137"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default Icon;
