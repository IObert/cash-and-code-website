import { Calendar, Clock, Headphones } from "lucide-react";

type Props = {
  title: string;
  href: string;
  date: string;
  summary: string;
  episodeNumber: number;
  durationMinutes?: number;
  tags: string[];
};

export function EpisodeCard({ title, href, date, summary, episodeNumber, durationMinutes, tags }: Props) {
  return (
    <a className="card episode-card" href={href}>
      <div className="episode-meta">
        <span>Folge {episodeNumber}</span>
        <span aria-hidden="true">·</span>
        <Calendar size={15} aria-hidden="true" />
        <span>{date}</span>
        {durationMinutes ? (
          <>
            <span aria-hidden="true">·</span>
            <Clock size={15} aria-hidden="true" />
            <span>{durationMinutes} Min.</span>
          </>
        ) : null}
      </div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <div className="tag-list" aria-label="Themen">
        {tags.slice(0, 4).map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <span className="button secondary" style={{ marginTop: "auto" }}>
        <Headphones size={17} aria-hidden="true" />
        Folge öffnen
      </span>
    </a>
  );
}
