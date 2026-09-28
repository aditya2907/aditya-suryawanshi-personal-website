# Aditya Suryawanshi — Personal Website

Creative software engineering portfolio for [adityasuryawanshi.com](https://adityasuryawanshi.com), built with Next.js and Tailwind CSS.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

The build exports a static site to `dist/`. Render deploys the `main` branch with `npm ci && npm run build` and publishes that directory.

Blog content is optional. If `NOTION_TOKEN` and `NOTION_DATABASE_ID` are not configured, the portfolio builds with an empty blog instead of failing.

## Deployment

- Production: [adityasuryawanshi.com](https://adityasuryawanshi.com)
- Render service: [aditya-suryawanshi.onrender.com](https://aditya-suryawanshi.onrender.com)

GitHub Actions verifies the production build on pushes and pull requests.
