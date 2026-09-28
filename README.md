
# Aditya Suryawanshi – Personal Website

Production domain: https://adityasuryawanshi.com

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:8080`. The current design is a terminal/editor-style
portfolio with a keyboard-accessible Snake game, file tabs, filtered projects,
and a searchable command palette (`Cmd/Ctrl+K`). Contact opens an email draft;
it does not send or store messages on a server.


## Checks and GitHub Actions

```bash
npm run lint:portfolio
npm test
npm run build
```

`.github/workflows/ci.yml` runs these checks with Node.js 22 on pushes,
pull requests, and manual dispatch. Actions are pinned to immutable commit SHAs
and use read-only repository permissions. No secrets or cloud credentials are
needed. There is no automatic deployment step. The workflow only becomes active
after it is committed and pushed to GitHub.

`lint:portfolio` checks the active portfolio and its tests. The original `lint`
command still includes older, unused scaffold components; those were preserved.

Active UI: `src/components/terminal/` and `src/styles/terminal.css`.
Portfolio content: `src/lib/portfolio-data.js`.

## Deploy to Google Cloud Run

The included multi-stage `Dockerfile` builds the Vite site and serves it with
Nginx on Cloud Run.

```bash
gcloud run deploy aditya-portfolio \
  --source . \
  --project advance-airline-465318-q7 \
  --region europe-west1 \
  --allow-unauthenticated
```

Production domain: https://adityasuryawanshi.com
