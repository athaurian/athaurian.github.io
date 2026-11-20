<script>
  import { onMount, tick } from 'svelte'
  import About from './About.svelte'
  import Home from './Home.svelte'
  import PageBar from './PageBar.svelte'
  import UtilityBar from './UtilityBar.svelte'
  import { formatTitle, pages, siteName } from './pages'
  import { routeFromPath } from './route'

  const route = routeFromPath(window.location.pathname)

  function readStoredTheme() {
    try {
      return localStorage.getItem('theme')
    } catch {
      return null
    }
  }

  let theme = $state(document.documentElement.dataset.theme)
  let themeTransitionId = 0
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  function applyTheme(next) {
    document.documentElement.dataset.theme = next
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim())
    theme = next
    return tick()
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'

    try {
      localStorage.setItem('theme', next)
    } catch {
      // Ignore storage failures so the theme still switches.
    }

    if (!document.startViewTransition || reducedMotion.matches) {
      applyTheme(next)
      return
    }

    const root = document.documentElement
    const id = ++themeTransitionId
    if (!root.classList.contains('theme-switching')) {
      const scrollbarWidth = window.innerWidth - root.clientWidth
      root.style.setProperty('--theme-scrollbar-width', `${scrollbarWidth}px`)
    }
    root.classList.add('theme-switching')

    const finish = () => {
      if (id === themeTransitionId) {
        root.classList.remove('theme-switching')
        root.style.removeProperty('--theme-scrollbar-width')
      }
    }

    try {
      const transition = document.startViewTransition(() => applyTheme(next))
      transition.finished.then(finish, finish)
    } catch {
      finish()
      applyTheme(next)
    }
  }

  onMount(() => {
    // Keep Svelte state in sync with the inline theme script.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystemTheme = (event) => {
      if (readStoredTheme()) return
      applyTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', followSystemTheme)

    if (route.name === 'home') {
      document.title = siteName
    } else {
      document.title = formatTitle(pages[route.name]?.title ?? pages.missing.title)
    }

    // Prefetch both wallpapers while idle to avoid a pop-in after a toggle.
    let idleId
    const prefetchWallpapers = () => {
      for (const src of ['/wallpaper-light.webp', '/wallpaper-dark.webp']) {
        const image = new Image()
        image.src = src
        image.decode?.().catch(() => {})
      }
    }
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(prefetchWallpapers, { timeout: 2500 })
    } else {
      idleId = setTimeout(prefetchWallpapers, 1200)
    }

    return () => {
      media.removeEventListener('change', followSystemTheme)
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      else clearTimeout(idleId)
    }
  })
</script>

<a class="skip-link" href="#content">Skip to content</a>
<div class="backdrop" aria-hidden="true"></div>
<UtilityBar {theme} onToggleTheme={toggleTheme} />
<div class="content" class:is-document={route.name !== 'home'}>
  {#if route.name === 'home'}
    <Home />
  {:else if route.name === 'about'}
    <About />
  {:else if route.name === 'writing'}
    <main class="reader">
      <PageBar current="writing" />
      <h1 id="content">Writing</h1>
      <p class="page-lede">Nothing here (yet).</p>
    </main>
  {:else}
    <main class="reader">
      <PageBar />
      <h1 id="content">Page not found</h1>
      <p class="page-lede">That link doesn't point anywhere. <a href="/">Go home</a>.</p>
    </main>
  {/if}
</div>
