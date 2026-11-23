export default function Card({ title, action, className = "", children }) {
  return (
    <section className={`min-w-0 rounded-2xl border border-line bg-panel p-5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-muted">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
