# Profil-Webseite

Persönliche Portfolio- und Projekt-Webseite mit **SvelteKit** und **SCSS**.

Im Fokus stehen ein typografischer Hero mit dynamisch wechselnden Schriftarten (inklusive passendem dynamischen Favicon), ein gespeicherter Light-/Dark-Mode sowie ein filterbares Projekt-Archiv für ausgewählte GitHub- und Codeberg-Repositories.

## Lokal starten

Voraussetzung ist [Bun](https://bun.sh/).

```bash
# Repository klonen
git clone <repository-url>
cd profil-webseite

# Abhängigkeiten installieren
bun install

# Entwicklungsserver starten
bun run dev
```

Die Seite läuft anschließend unter `http://localhost:5173`.

## Statischer Build & Vorschau

```bash
# Statische Seite für GitHub Pages bauen (Ausgabe in /build)
bun run build

# Gebaute Seite lokal testen
bun run preview
```

## Eigene Daten anpassen

Alle persönlichen Angaben, Links und Projekte liegen zentral in `src/lib/data/profile.ts`. Das Deployment auf GitHub Pages erfolgt automatisch bei jedem Push auf `main` über `.github/workflows/deploy.yml` (in den Repository-Einstellungen unter _Settings → Pages_ als Source **GitHub Actions** wählen).
