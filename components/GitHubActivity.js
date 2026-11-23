"use client";

import { useEffect, useState } from "react";
import Card from "./Card";

function describe(e) {
  const p = e.payload || {};
  switch (e.type) {
    case "PushEvent":
      return `Pushed ${p.size ?? p.commits?.length ?? ""} commit(s)`;
    case "PullRequestEvent":
      return `${p.action === "closed" && p.pull_request?.merged ? "Merged" : cap(p.action)} a pull request`;
    case "IssuesEvent":
      return `${cap(p.action)} an issue`;
    case "IssueCommentEvent":
      return "Commented on an issue";
    case "WatchEvent":
      return "Starred";
    case "CreateEvent":
      return `Created ${p.ref_type}`;
    case "ForkEvent":
      return "Forked";
    case "ReleaseEvent":
      return "Published a release";
    default:
      return e.type.replace("Event", "");
  }
}

const cap = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

function ago(date) {
  const s = (Date.now() - new Date(date)) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

export default function GitHubActivity({ username }) {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public?per_page=8`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setEvents)
      .catch(() => setError(true));
  }, [username]);

  return (
    <Card
      title="GitHub activity"
      action={
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-xs text-accent">
          @{username}
        </a>
      }
    >
      {error && <p className="text-sm text-bad">Couldn&apos;t load GitHub activity.</p>}
      {!events && !error && <p className="text-sm text-muted">Loading…</p>}
      {events && events.length === 0 && <p className="text-sm text-muted">No recent public activity.</p>}
      {events && (
        <ul className="space-y-3">
          {events.slice(0, 6).map((e) => (
            <li key={e.id} className="text-sm">
              <p>
                {describe(e)}{" "}
                <a href={`https://github.com/${e.repo.name}`} target="_blank" rel="noreferrer" className="text-accent">
                  {e.repo.name}
                </a>
              </p>
              <p className="text-xs text-muted">{ago(e.created_at)}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
