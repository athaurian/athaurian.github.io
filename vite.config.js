import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { formatTitle, pages } from './src/pages.js'

const origin = 'https://athaurian.github.io'
const buildDate = new Date().toISOString().slice(0, 10)

// Vite's define skips .svelte files, so replace the token before Svelte compiles.
function buildDateDefine() {
  return {
    name: 'build-date-define',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.svelte')) return
      return code.replaceAll('__BUILD_DATE__', JSON.stringify(buildDate))
    },
  }
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
      })[character],
  )
}

function noscriptBlock(inner) {
  return `<noscript>
      <div style="max-width: 66ch; margin: 2rem auto; padding: 0 1rem; color: var(--color-text-secondary)">
        ${inner}
      </div>
    </noscript>`
}

function withPageMeta(html, { title, description, path, canonical = true, noindex = false, noscript }) {
  const fullTitle = escapeHtml(formatTitle(title))
  const safeDescription = escapeHtml(description)
  const safeUrl = escapeHtml(`${origin}/${path}`)

  let output = html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${fullTitle}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      (_, start, end) => `${start}${safeDescription}${end}`,
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      (_, start, end) => `${start}${fullTitle}${end}`,
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      (_, start, end) => `${start}${safeDescription}${end}`,
    )
    .replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      (_, start, end) => `${start}${safeUrl}${end}`,
    )
    .replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      (_, start, end) => `${start}${fullTitle}${end}`,
    )
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      (_, start, end) => `${start}${safeDescription}${end}`,
    )

  if (canonical) {
    output = output.replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      (_, start, end) => `${start}${safeUrl}${end}`,
    )
  } else {
    output = output.replace(/\s*<link\b[^>]*\brel="canonical"[^>]*>/i, '')
  }

  if (noindex) {
    output = output.replace('<title>', '<meta name="robots" content="noindex" />\n    <title>')
  }

  if (noscript) {
    output = output.replace(/<noscript>[\s\S]*?<\/noscript>/, () => noscript)
  }

  return output
}

function sitemap(paths) {
  const urls = paths.map((path) => `  <url><loc>${origin}/${path}</loc></url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

// GitHub Pages serves static files, so emit a copy of the shell for each route.
function staticPages() {
  return {
    name: 'static-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html']
      if (!index) return

      const html = String(index.source)
      const entries = [
        {
          path: 'about/',
          title: pages.about.title,
          description: pages.about.description,
          noscript: noscriptBlock(
            `<p><strong style="color: var(--color-text-primary)">About</strong>: CS undergrad at Universitas Indonesia, making things for my own use.</p>
        <p><a href="/" style="color: inherit">Home</a> · <a href="https://github.com/athaurian" style="color: inherit">GitHub</a></p>`,
          ),
        },
        {
          path: 'writing/',
          title: pages.writing.title,
          description: pages.writing.description,
          noscript: noscriptBlock(
            `<p><strong style="color: var(--color-text-primary)">Writing</strong>: <a href="/" style="color: inherit">Home</a>.</p>`,
          ),
        },
      ]

      for (const page of entries) {
        this.emitFile({
          type: 'asset',
          fileName: `${page.path}index.html`,
          source: withPageMeta(html, page),
        })
      }

      // Serve the same shell at unknown paths through 404.html.
      const notFound = withPageMeta(html, {
        path: '404.html',
        title: pages.missing.title,
        description: pages.missing.description,
        canonical: false,
        noindex: true,
        noscript: noscriptBlock(
          `<p><strong style="color: var(--color-text-primary)">404</strong>: nothing here. <a href="/" style="color: inherit">Go home</a>.</p>`,
        ),
      })

      this.emitFile({ type: 'asset', fileName: '404.html', source: notFound })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemap(['', ...entries.map(({ path }) => path)]),
      })
    },
  }
}

export default defineConfig({
  define: { __BUILD_DATE__: JSON.stringify(buildDate) },
  plugins: [buildDateDefine(), svelte(), staticPages()],
})
