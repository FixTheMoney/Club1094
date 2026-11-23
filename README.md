# My Dashboard

A personal hub and business-metrics dashboard built with **Next.js** and **Tailwind CSS**, ready to deploy on Vercel.

**Personal hub:** live clock and greeting, weather with a 5-day forecast (Open-Meteo, no API key needed), a to-do list saved in your browser, quick links, and your public GitHub activity.

**Business overview:** KPI cards, monthly revenue and user charts, sales by channel, and recent orders. It ships with sample data.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Make it yours

| File | What to change |
|---|---|
| `lib/config.js` | Your name, weather location, GitHub username, quick links, currency |
| `lib/metrics.js` | Swap the sample data for your real data (API, database, CSV…) |
| `app/globals.css` | Colors (the `@theme` block) |
| `app/page.js` | Layout: add, remove or reorder cards |

### Using real business data

`getMetrics()` in `lib/metrics.js` runs on the server. You can replace its body with a fetch to your own API and return the same shape. Put secrets such as API keys in environment variables:

- **Locally:** create a `.env.local` file, for example `METRICS_URL=https://...`. Git ignores it.
- **On Vercel:** go to Project → Settings → Environment Variables.

The page refreshes its data at most once an hour (`revalidate` in `app/page.js`). The same data is also available as JSON at `/api/metrics`.

## Deploy

### 1. Push to GitHub

Create an empty repository on https://github.com/new (don't add a README). Then, from this folder:

```bash
git init
git add .
git commit -m "Initial dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/my-dashboard.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/new and sign in with GitHub.
2. Import your `my-dashboard` repository.
3. Vercel detects Next.js on its own, so leave the settings as they are and click **Deploy**.

You'll get a live URL like `my-dashboard-xyz.vercel.app`. Every `git push` to `main` redeploys the site automatically.

> **Privacy note:** anyone with the URL can see the deployed site. If you add real business
> numbers, put a login in front of it before sharing the link.
