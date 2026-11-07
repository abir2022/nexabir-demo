# Nexabir — showcase demo

A small, self-contained preview of Nexabir for sharing on GitHub.

This folder is **not** the production app. It does not read `.env`, talk to Supabase, use the Electron store, or contain any real data. Every name, project, balance and notification here is fictional.

## Open it

Open `demo/index.html` in a browser, or serve the folder:

```bash
python -m http.server 4173 --directory demo --bind 127.0.0.1
```

Then visit <http://127.0.0.1:4173>.

## Demo sign-in

The sign-in is a browser-only gate; there is deliberately no password reset flow.

- Email: `demo@nexabir.app`
- Password: `nexabir`

The credentials are also shown on the login screen and can be filled with **Use demo account**.

## What to look at

- **Overview** — today's focus, weekly pulse and the four areas.
- **Work** — toggle tasks, or add one to the in-memory demo list.
- **Personal** — habits, weekly rhythm and a journal entry.
- **Business** — a small, fictional client pipeline.
- **Money** — net worth, accounts and recent transactions.
- **Bridge** — a simulated phone-to-PC bridge with a test notification and an offline-queue toggle. No device is contacted; the page says so explicitly.

The layout is responsive: desktop gets a sidebar rail, phones get a bottom navigation bar.

## Publish with GitHub Pages

The included workflow publishes **only this `demo/` folder**:

`.github/workflows/demo-pages.yml`

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**, then push to `main`. The site will be at `https://<user>.github.io/<repo>/`.

## Notes

- No build step, no dependencies, no framework.
- Theme preference is kept in `localStorage`; the demo login lasts for the browser session.
- Added tasks and bridge events live in memory only and reset on reload.
- The actual Nexabir product is a local-first Electron app; this demo is intentionally isolated from it.
