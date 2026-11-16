<div align="center">
<img src="public/favicon.svg" alt="athaurian.github.io monogram" width="128">

# athaurian.github.io

</div>

Hi. This is my single-page personal site, built with Vite and Svelte. The site
is live at [athaurian.github.io](https://athaurian.github.io).

## Development

Requires Node.js `22.12+`.

```bash
npm install
npm run dev      # start local dev server
npm run build    # build static output into dist/
npm run preview  # preview the production build locally
```

## Editing content

- **Page copy and links:** Edit the `projects`, `writing`, `notes`, and `elsewhere` arrays at the top of `src/App.svelte`.
- **Theme toggle and wallpaper picker:** Edit `src/UtilityBar.svelte`.
- **Downloadable wallpapers:** Place static assets in `wallpapers/`.

## Deployment

Pushing to `main` (or triggering the workflow manually via `workflow_dispatch`) runs `.github/workflows/deploy.yml`, which builds `dist/` and publishes it to GitHub Pages.

## License

MIT
