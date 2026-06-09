export function withBase(path: string) {
  if (/^(https?:|mailto:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}
