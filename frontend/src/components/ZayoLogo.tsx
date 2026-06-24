type ZayoLogoProps = {
  className?: string;
};

export function ZayoLogo({ className = 'h-9 w-9' }: ZayoLogoProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zayo logo"
      role="img"
    >
      <rect width="36" height="36" rx="8" fill="#F47920" />
      <path
        d="M10 12h16l-8 12h8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
