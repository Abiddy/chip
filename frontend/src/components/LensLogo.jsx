export default function LensLogo({ className = "h-8" }) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/lens-logo.png`}
      alt="Lens"
      className={`${className} w-auto select-none`}
      draggable="false"
    />
  );
}
