import Card from "./Card";

export default function Links({ links }) {
  return (
    <Card title="Quick links">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm hover:border-accent hover:text-accent"
          >
            {/* Site favicon via Google's public favicon service */}
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(l.url).hostname}&sz=32`}
              alt=""
              width={16}
              height={16}
            />
            <span className="truncate">{l.label}</span>
          </a>
        ))}
      </div>
    </Card>
  );
}
