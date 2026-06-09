# Cash and Code Website

Dieses Projekt ist eine statisch generierte Podcast-Webseite fuer GitHub Pages.

## Stack

- Astro fuer statische Seitengenerierung
- React fuer wiederverwendbare UI-Komponenten
- TypeScript
- Astro Content Collections fuer Folgen, Hosts und Themen
- GitHub Actions Deployment nach GitHub Pages

## Wichtige Kommandos

```sh
pnpm install
pnpm dev --host 127.0.0.1
pnpm build
pnpm preview
```

`pnpm build` fuehrt `astro check` und danach `astro build` aus. Vor groesseren Aenderungen immer mindestens `pnpm build` laufen lassen.

## Struktur

- `src/pages/`: statische Routen
- `src/content/episodes/`: Podcast-Folgen als Markdown
- `src/content/authors/`: Host-Profile
- `src/content/topics/`: Themenseiten
- `src/components/`: React-Komponenten
- `src/layouts/BaseLayout.astro`: globales HTML-Layout, Navigation, SEO-Basis
- `src/styles.css`: globales Styling
- `public/`: statische Assets wie Cover und Host-Bilder
- `.github/workflows/deploy.yml`: GitHub-Pages-Deployment

## Content-Pflege

Neue Folgen werden als Markdown-Dateien in `src/content/episodes/` angelegt. Die Frontmatter muss zum Schema in `src/content.config.ts` passen:

```yaml
---
title: "Folgentitel"
date: "2026-06-01"
episodeNumber: 12
spotifyUrl: "https://open.spotify.com/episode/..."
spotifyId: "..."
durationMinutes: 42
tags:
  - "KI"
summary: "Kurze Beschreibung fuer Karten und Meta Description."
---
```

Der Body der Markdown-Datei ist die laengere Folgenbeschreibung.

## GitHub Pages

Das Projekt unterstuetzt GitHub Project Pages ueber `BASE_PATH`.

Im GitHub-Action-Build wird automatisch gesetzt:

- `SITE_URL`: `https://<owner>.github.io/<repo>`
- `BASE_PATH`: `/<repo>`

Bei Custom Domain in GitHub Actions Repository Variables setzen:

- `SITE_URL=https://deine-domain.de`
- `BASE_PATH=/`

Interne Links und Asset-Pfade sollten mit `withBase()` aus `src/utils/withBase.ts` erzeugt werden, damit Project Pages und Custom Domains beide funktionieren.

## Quellenstatus

Die initialen Folgen wurden aus `https://iobert.me/speaking` und Spotify-Metadaten fuer `Cash and Code` importiert. Das Skript `work/generate-episodes.mjs` ist ein Hilfsskript fuer diesen Import und gehoert nicht zur Runtime.

## Offene redaktionelle Punkte

- Impressum und Datenschutz sind gepflegt; bei Rechts- oder Tool-Aenderungen regelmaessig auf Aktualitaet pruefen.
- Host-Avatare liegen als PNG in `public/` und werden ueber die Author-Content-Dateien referenziert.

## Stilhinweise

- Die Seite ist komplett auf Deutsch.
- Keine Landingpage-Floskeln: die Startseite soll direkt Podcast, Mission, aktuelle Folge und Hosts zeigen.
- Bei neuen Seiten SEO mitdenken: sprechende URLs, klare Meta Description, strukturierte Inhalte.
- Bestehende Farben, Abstaende und 8px-Radien beibehalten, sofern kein bewusstes Redesign geplant ist.
