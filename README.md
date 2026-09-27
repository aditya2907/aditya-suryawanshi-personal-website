
# Aditya Suryawanshi – Personal Website

Production domain: https://adityasuryawanshi.com

## Deploy to Netlify

The repository includes `netlify.toml`, so Netlify will automatically use:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 22

After importing the repository in Netlify, add `adityasuryawanshi.com` as the
primary custom domain and follow Netlify's displayed DNS instructions. Add
`www.adityasuryawanshi.com` as a domain alias so Netlify can redirect it to the
primary domain and provision HTTPS for both hostnames.
