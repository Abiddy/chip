export default function LensLogo({ className = "h-8" }) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/ace-logo.png`}
      alt="Lens ACE"
      className={`${className} w-auto select-none`}
      draggable="false"
    />
  );
}
