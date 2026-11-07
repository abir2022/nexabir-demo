# Nexabir — showcase demo

A standalone, browser-only preview of Nexabir for desktop and mobile. This repository contains **only the demo**; it is not the production application and has no backend, Supabase connection, or real user data.

## Live demo

**https://abir2022.github.io/nexabir-demo/**

## Demo sign-in

- Email: `demo@nexabir.app`
- Password: `nexabir`

The credentials are shown on the sign-in screen. There is no password-recovery flow because this is a fictional showcase account.

## Explore

- **Overview** — today's focus, weekly pulse and the four life areas.
- **Work** — add and complete tasks, and browse active projects.
- **Personal** — habits, weekly rhythm and a journal entry.
- **Business** — a fictional client pipeline.
- **Money** — net worth, accounts and recent transactions.
- **Bridge** — a clearly simulated phone-to-PC bridge with test notifications and an offline-queue toggle.

The UI is responsive: desktop gets a sidebar rail and phones get a bottom navigation bar.

## Run locally

```bash
python -m http.server 4173 --directory demo --bind 127.0.0.1
```

Then visit <http://127.0.0.1:4173>.

## Notes

- No build step and no dependencies.
- Theme preference is kept in `localStorage`; the demo login lasts for the browser session.
- Added tasks and bridge events live in memory only and reset on reload.
- GitHub Pages is published from the `demo/` folder by `.github/workflows/demo-pages.yml`.
