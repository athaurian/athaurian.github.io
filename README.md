<div align="center">
<img src="public/favicon.svg" alt="athaurian.github.io monogram" width="128">

# athaurian.github.io

</div>

Hi. This is my personal site, built with Vite and Svelte. The site is published at
[athaurian.github.io](https://athaurian.github.io).

## Development

Requires Node.js `22.12+`.

```bash
npm install
npm run dev      # start local dev server
npm run check    # type and accessibility checks
npm run build    # build static output into dist/
npm run preview  # preview the production build locally
```

## Editing content

- **Homepage copy and links:** Edit the `projects`, `hobbies`, and `uses` arrays in `src/Home.svelte`.
- **Social links and home navigation:** Edit `src/Identity.svelte`.
- **Document-page navigation:** Edit `src/PageBar.svelte`.
- **About page:** Edit the copy in `src/About.svelte`.
- **Page titles and descriptions:** Edit `src/pages.js`. The app and the build share it.
- **Theme toggle and wallpaper link:** Edit `src/UtilityBar.svelte`.
- **Site wallpapers:** See [Wallpapers](#wallpapers).

### Wallpapers

| Asset                         | Role                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| `public/wallpaper-light.webp` | Light-theme background with a 16 px blur baked in.           |
| `public/wallpaper-dark.webp`  | Dark-theme background with a 26 px blur baked in.            |
| `wallpapers/`                 | Sharp originals linked from the eye icon in the utility bar. |

- **Change a background:** Regenerate its blurred derivative in `public/`.
- **Add a downloadable original:** Place the file in `wallpapers/`.

## Routes

| Route       | Renders                          |
| :---------- | :------------------------------- |
| `/`         | `src/Home.svelte`                |
| `/about/`   | `src/About.svelte`               |
| `/writing/` | Placeholder in `src/App.svelte`  |
| Other paths | 404 fallback in `src/App.svelte` |

- **Build:** `vite.config.js` emits the about and writing pages, `404.html`, and `sitemap.xml` into `dist/`.
- **Development:** The dev server falls back to `index.html` for all routes, so no build is needed while editing.

## Deployment

Pushing to `main` (or triggering the workflow manually via `workflow_dispatch`) runs `.github/workflows/deploy.yml`, which builds `dist/` and publishes it to GitHub Pages.

## License

MIT
