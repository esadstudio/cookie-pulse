# GitHub Pages (free live URL)

Cookie Pulse deploys as a static Vite site on GitHub Pages. **No secrets. No paid host. No COOK spend.**

Expected URL after the first successful deploy from `main`:

https://esadstudio.github.io/cookie-pulse/

## What the workflow does

`.github/workflows/pages.yml`

1. On pull requests: `npm ci`, `npm test`, `npm run build` (merge check only).
2. On push to `main` (or **Actions → GitHub Pages → Run workflow**): same build, then `actions/upload-pages-artifact` + `actions/deploy-pages`.

The build sets `VITE_BASE_PATH=/cookie-pulse/` so assets load under the project-site path.

## Enable Pages (Esad — one-time, $0)

GitHub will **not** publish until Pages is set to GitHub Actions. Do this in the repo UI. No tokens, no `.env` secrets.

1. Open https://github.com/esadstudio/cookie-pulse
2. **Settings** (repo settings, not account settings)
3. Left sidebar → **Pages**
4. Under **Build and deployment** → **Source**, choose **GitHub Actions**
   - Do **not** pick “Deploy from a branch”
5. Save if GitHub shows a Save button
6. Optional check: **Settings → Actions → General → Workflow permissions**
   - **Read and write permissions** is fine
   - Or leave **Read repository contents** — the deploy job already requests `pages: write` and `id-token: write`
7. After merge to `main` (or a manual **workflow_dispatch**), open **Actions → GitHub Pages** and confirm the **Deploy** job is green
8. Open https://esadstudio.github.io/cookie-pulse/

### First-run blockers (still free)

| What you see | What to do |
| --- | --- |
| Source is still “Deploy from a branch” | Switch to **GitHub Actions** (step 4). Redeploy via **Actions → GitHub Pages → Run workflow**. |
| Deploy job waits on `github-pages` environment | **Settings → Environments → github-pages**. If a required reviewer is set, approve the deployment or remove the reviewer so `main` can publish. |
| 404 at the site URL | Wait a minute after a green Deploy job. Confirm the URL includes `/cookie-pulse/`. |
| Workflow skipped “Pages is disabled” | Repeat Settings → Pages → Source → **GitHub Actions**. Public repos get Pages for free. |

Do not add `GITHUB_TOKEN` as a repo secret. The default Actions token is enough.

Do not use Vercel, a custom domain purchase, or a paid Pages plan. This public repo is enough.
