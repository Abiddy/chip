export default function LensLogo({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lens logo"
    >
      {/* Chip frame */}
      <rect
        x="5"
        y="5"
        width="22"
        height="22"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Pins */}
      <line x1="2" y1="11" x2="5" y2="11" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="16" x2="5" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="21" x2="5" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="27" y1="11" x2="30" y2="11" stroke="currentColor" strokeWidth="1.5" />
      <line x1="27" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="27" y1="21" x2="30" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="2" x2="11" y2="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="2" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="21" y1="2" x2="21" y2="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="27" x2="11" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="27" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="21" y1="27" x2="21" y2="30" stroke="currentColor" strokeWidth="1.5" />
      {/* Center lens dot */}
      <circle cx="16" cy="16" r="3.2" fill="#ff8a3d" />
      <circle cx="16" cy="16" r="1.4" fill="#050505" />
    </svg>
  );
}
