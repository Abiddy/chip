export default function SectionHeader({ label, title, description, className = "" }) {
  return (
    <div className={`mb-16 md:mb-20 max-w-4xl ${className}`}>
      <div className="flex items-center gap-4 mb-6">
        <span className="mono text-[10px] text-teal-600">{label}</span>
        <div className="h-px w-12 bg-border" />
      </div>
      {title}
      {description && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function SpecBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm mono text-[10px] bg-[#CCF0EA] text-[#006D5B] ${className}`}
    >
      {children}
    </span>
  );
}
