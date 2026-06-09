import fs from "node:fs";
import path from "node:path";

const bundle = fs.readFileSync("work/iobert-index.js", "utf8");
const start = bundle.indexOf("const fp=");
const end = bundle.indexOf("];function X2", start) + 1;
const source = Function(`return ${bundle.slice(start + "const fp=".length, end)}`)().filter((item) => item.isPodcast);
const byId = new Map(source.map((item) => [item.recordingUrl.split("/").pop(), item]));

const html = fs.readFileSync("work/spotify-show.html", "utf8");
const b64 = html.match(/<script id="initialState" type="text\/plain">([^<]+)/)[1];
const state = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));

const episodes = [];
function walk(value) {
  if (!value || typeof value !== "object") return;
  if (value.__typename === "Episode" || (value.name && value.uri && String(value.uri).startsWith("spotify:episode:"))) {
    episodes.push(value);
  }
  for (const child of Object.values(value)) walk(child);
}
walk(state);

const unique = [...new Map(episodes.map((episode) => [episode.id, episode])).values()];

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

function clean(input) {
  return String(input || "")
    .replace(/\u200b/g, " ")
    .replace(/([.!?])(?=[A-ZÄÖÜ])/g, "$1 ")
    .replace(/\bploetzlich\b/g, "plötzlich")
    .replace(/\blaeuft\b/g, "läuft")
    .replace(/\bdarueber\b/g, "darüber")
    .replace(/\bSicherheitsluecken\b/g, "Sicherheitslücken")
    .replace(/\bAusserdem\b/g, "Außerdem")
    .replace(/\bschuetzen\b/g, "schützen")
    .replace(/\s+/g, " ")
    .trim();
}

function yamlString(input) {
  return `"${String(input).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

fs.mkdirSync("src/content/episodes", { recursive: true });

for (const [index, episode] of unique.entries()) {
  const sourceEpisode = byId.get(episode.id);
  const iso = episode.releaseDate?.isoString || sourceEpisode?.date;
  const date = iso.slice(0, 10);
  const title = sourceEpisode?.title || episode.name;
  const description = clean(sourceEpisode?.abstract || episode.description);
  const summary =
    description.length > 240 ? `${description.slice(0, 237).replace(/\s+\S*$/, "")}...` : description;
  const durationMinutes = episode.duration?.totalMilliseconds
    ? Math.round(episode.duration.totalMilliseconds / 60000)
    : undefined;
  const episodeNumber = unique.length - index;
  const tags = [...new Set((sourceEpisode?.tags || ["Podcast"]).filter((tag) => tag !== "Podcast"))];
  if (tags.length === 0) tags.push("Podcast");
  const slug = `${String(episodeNumber).padStart(2, "0")}-${slugify(title)}`;
  const body = description.split(/\n\n+/).map((part) => part.trim()).filter(Boolean).join("\n\n");
  const frontmatter = [
    "---",
    `title: ${yamlString(title)}`,
    `date: ${yamlString(date)}`,
    `episodeNumber: ${episodeNumber}`,
    `spotifyUrl: ${yamlString(`https://open.spotify.com/episode/${episode.id}`)}`,
    `spotifyId: ${yamlString(episode.id)}`,
    durationMinutes ? `durationMinutes: ${durationMinutes}` : null,
    "tags:",
    ...tags.map((tag) => `  - ${yamlString(tag)}`),
    `summary: ${yamlString(summary)}`,
    "---",
    "",
    body,
    "",
  ].filter(Boolean);

  fs.writeFileSync(path.join("src/content/episodes", `${slug}.md`), frontmatter.join("\n"));
}

console.log(`Wrote ${unique.length} episodes`);
