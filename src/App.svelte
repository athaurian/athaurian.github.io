<!-- Page content, section data, and theme toggling. -->
<script>
  import { onMount, tick } from 'svelte'
  import { ChevronDown, Mail } from '@lucide/svelte'
  import BashMark from './BashMark.svelte'
  import CachyOSMark from './CachyOSMark.svelte'
  import HeliumMark from './HeliumMark.svelte'
  import KittyMark from './KittyMark.svelte'
  import MpvMark from './MpvMark.svelte'
  import NeovimMark from './NeovimMark.svelte'
  import ObsidianMark from './ObsidianMark.svelte'
  import SwayMark from './SwayMark.svelte'
  import GithubMark from './GithubMark.svelte'
  import LinkedInMark from './LinkedInMark.svelte'
  import XMark from './XMark.svelte'
  import TypedTitle from './TypedTitle.svelte'
  import UtilityBar from './UtilityBar.svelte'

  // --- Editable content ---
  const pseudonym = 'athaurian'

  const projects = [
    {
      label: 'dotfiles',
      description: 'My over-engineered Linux setup',
      link: 'https://athaurian.github.io/dotfiles/',
      url: 'athaurian/dotfiles',
    },
    {
      label: 'forge',
      description: 'My Arch Linux package repository',
      link: 'https://github.com/athaurian/forge',
      url: 'athaurian/forge',
    },
    {
      label: 'calpdf',
      description: 'A simple PDF toolkit to run alongside Calibre',
      link: 'https://athaurian.github.io/calpdf/',
      url: 'athaurian/calpdf',
    },
  ]

  const socials = [
    {
      label: 'GitHub',
      link: 'https://github.com/athaurian',
      subtext: 'Spaghetti code',
      icon: GithubMark,
    },
    {
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/athaurian/',
      subtext: 'The professional one',
      icon: LinkedInMark,
    },
    {
      label: 'Twitter',
      link: 'https://twitter.com/athaurian',
      subtext: 'The rebrand to X was a mistake',
      icon: XMark,
    },
    {
      label: 'Email',
      link: 'mailto:athaurian@duck.com',
      subtext: 'Best way to reach me',
      icon: Mail,
    },
  ]

  const hobbies = [
    { label: 'Playing the piano', subtext: '...only when I have the time to' },
    { label: 'Running', subtext: 'Short distances' },
    { label: 'Reading fiction', subtext: 'A chapter before bed' },
  ]

  const uses = [
    { label: 'CachyOS', subtext: 'Operating system', icon: CachyOSMark, link: 'https://cachyos.org' },
    { label: 'Sway', subtext: 'Window manager', icon: SwayMark, link: 'https://swaywm.org' },
    { label: 'kitty', subtext: 'Terminal emulator', icon: KittyMark, link: 'https://sw.kovidgoyal.net/kitty/' },
    { label: 'Neovim', subtext: 'Text editor', icon: NeovimMark, link: 'https://neovim.io' },
    { label: 'Bash', subtext: 'Shell', icon: BashMark, link: 'https://www.gnu.org/software/bash/' },
    { label: 'Helium', subtext: 'Web browser', icon: HeliumMark, link: 'https://helium.computer' },
    { label: 'Obsidian', subtext: 'Note-taking app', icon: ObsidianMark, link: 'https://obsidian.md' },
    { label: 'mpv', subtext: 'Media player', icon: MpvMark, link: 'https://mpv.io' },
  ]

  let theme = $state(document.documentElement.dataset.theme)
  let themeTransitionId = 0
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  // Closed details don't render rows, so defer the stagger one frame.
  function stagger(node) {
    let frame = 0

    const sync = () => {
      cancelAnimationFrame(frame)

      if (!node.open) {
        node.classList.remove('is-open')
        return
      }

      frame = requestAnimationFrame(() => {
        if (node.open) node.classList.add('is-open')
      })
    }

    node.addEventListener('toggle', sync)
    sync()

    return {
      destroy() {
        cancelAnimationFrame(frame)
        node.removeEventListener('toggle', sync)
      },
    }
  }

  // Old links such as `/#uses` still exist, and should reveal their panel.
  function openHashTarget() {
    let id = window.location.hash.slice(1)
    if (!id) return

    try {
      id = decodeURIComponent(id)
    } catch {
      return
    }

    const panel = document.getElementById(id)?.closest('details')
    if (!panel || panel.open) return

    panel.open = true
    requestAnimationFrame(() => panel.scrollIntoView({ block: 'start' }))
  }

  function applyTheme(next) {
    document.documentElement.dataset.theme = next
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim())
    theme = next
    return tick()
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'

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
      applyTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', followSystemTheme)

    openHashTarget()
    window.addEventListener('hashchange', openHashTarget)

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
      window.removeEventListener('hashchange', openHashTarget)
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      else clearTimeout(idleId)
    }
  })
</script>

<div class="backdrop" aria-hidden="true"></div>
<div class="content">
  <UtilityBar {theme} onToggleTheme={toggleTheme} />

  <main class="split">
    <aside id="home" class="identity" aria-labelledby="home-title">
      <div class="identity-inner">
        <img class="avatar" src="/pfp.webp" alt="" width="80" height="80" decoding="async" />
        <p class="greeting">Hi, I'm</p>
        <TypedTitle {pseudonym} />
        <p class="tagline">
          I'm a CS undergrad at
          <img class="ui-logo" src="/ui-logo.svg" alt="" />
          <span class="institution">Universitas Indonesia</span>,
          and I<br class="tagline-break" /> like making things for my own use.
          <span class="tagline-sub">Let's connect!</span>
        </p>
        <ul id="socials" class="connect-links">
          {#each socials as social}
            {@const Icon = social.icon}
            {@const isExternal = social.link.startsWith('http')}
            <li>
              <a
                href={social.link}
                target={isExternal ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={social.label}
                title={`${social.label} — ${social.subtext}`}
              >
                <Icon size={18} />
              </a>
            </li>
          {/each}
        </ul>
        <p class="identity-quote">Less is more.</p>
      </div>
    </aside>

    <div class="links">
      <div class="links-inner">
        <details class="disclosure" id="projects" name="sections" use:stagger>
          <summary>
            <h2>Projects</h2>
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <div class="disclosure-body">
            <ol class="projects-list">
              {#each projects as project}
                <li>
                  <a class="project-link" href={project.link} target="_blank" rel="noreferrer">
                    <span class="item-title">{project.label}</span>
                    <span class="item-meta">{project.url}</span>
                    <p>{project.description}</p>
                  </a>
                </li>
              {/each}
            </ol>
          </div>
        </details>

        <details class="disclosure" id="hobbies" name="sections" use:stagger>
          <summary>
            <h2>Hobbies</h2>
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <div class="disclosure-body">
            <ul class="plain-list">
              {#each hobbies as hobby}
                <li>
                  <span class="item-title">{hobby.label}</span>
                  <span class="item-meta">{hobby.subtext}</span>
                </li>
              {/each}
            </ul>
          </div>
        </details>

        <details class="disclosure" id="uses" name="sections" use:stagger>
          <summary>
            <h2>Stuff I use</h2>
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <div class="disclosure-body">
            <p class="section-sub">Software written by people much smarter than me.</p>
            <ul class="uses-grid">
              {#each uses as tool}
                {@const Icon = tool.icon}
                <li>
                  <a class="use-link" href={tool.link} target="_blank" rel="noreferrer">
                    <Icon size={22} />
                    <span class="use-copy">
                      <span class="item-title">{tool.label}</span>
                      <span class="item-meta">{tool.subtext}</span>
                    </span>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </details>
      </div>
    </div>
  </main>
</div>
