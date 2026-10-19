# Standalone frontend for GitHub Pages

This folder is a self-contained Vite + React frontend. Copy its contents (including `.github`) into the root of the destination repository.

## Publish with GitHub Pages

1. In the destination repository, open **Settings → Pages** and set the source to **GitHub Actions**.
2. Push this project to any branch. The workflow in `.github/workflows/pages.yml` builds and deploys that branch.
3. Open the deployment run in **Actions** to find the published URL.

Vite uses relative asset URLs so the site works both at a user/org root URL and at a project URL such as `https://username.github.io/repository/`.

To enable API-backed features, add a repository Actions variable named `VITE_API_URL` containing the public API base URL. GitHub Pages serves only static files; it does not host the API.

For local development, run `npm ci` and then `npm run dev`.
