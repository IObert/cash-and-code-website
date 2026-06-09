type Props = {
  name: string;
  role: string;
  image?: string;
  body: string;
  links: { label: string; url: string }[];
};

export function AuthorCard({ name, role, image, body, links }: Props) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="card author-card">
      <div className="author-row">
        {image ? <img className="author-image" src={image} alt={name} width="80" height="80" /> : <div className="author-fallback">{initials}</div>}
        <div>
          <h3>{name}</h3>
          <p style={{ margin: 0, color: "var(--muted)" }}>{role}</p>
        </div>
      </div>
      <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>{body}</p>
      <div className="tag-list">
        {links.map((link) => (
          <a className="tag" href={link.url} key={link.url}>{link.label}</a>
        ))}
      </div>
    </article>
  );
}
