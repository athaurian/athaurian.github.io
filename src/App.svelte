<script>
  import { onMount } from 'svelte'
  import { Bird, Mail } from '@lucide/svelte'
  import BashMark from './BashMark.svelte'
  import CachyOSMark from './CachyOSMark.svelte'
  import FootMark from './FootMark.svelte'
  import HeliumMark from './HeliumMark.svelte'
  import MpvMark from './MpvMark.svelte'
  import NeovimMark from './NeovimMark.svelte'
  import ObsidianMark from './ObsidianMark.svelte'
  import SwayMark from './SwayMark.svelte'
  import GithubMark from './GithubMark.svelte'
  import LinkedInMark from './LinkedInMark.svelte'
  import TypedTitle from './TypedTitle.svelte'
  import UtilityBar from './UtilityBar.svelte'

  // --- Editable content ---
  const pseudonym = 'athaurian'
  const lastBuilt = __BUILD_DATE__

  const projects = [
    {
      label: 'dotfiles',
      description: 'My over-engineered Linux setup',
      link: 'https://github.com/athaurian/dotfiles',
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
      link: 'https://github.com/athaurian/calpdf',
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
      subtext: 'No, I refuse to call it X',
      icon: Bird,
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
    { label: 'foot', subtext: 'Terminal emulator', icon: FootMark, link: 'https://codeberg.org/dnkl/foot' },
    { label: 'Neovim', subtext: 'Text editor', icon: NeovimMark, link: 'https://neovim.io' },
    { label: 'Bash', subtext: 'Shell', icon: BashMark, link: 'https://www.gnu.org/software/bash/' },
    { label: 'Helium', subtext: 'Web browser', icon: HeliumMark, link: 'https://helium.computer' },
    { label: 'Obsidian', subtext: 'Note-taking app', icon: ObsidianMark, link: 'https://obsidian.md' },
    { label: 'mpv', subtext: 'Media player', icon: MpvMark, link: 'https://mpv.io' },
  ]

  let theme = $state(document.documentElement.dataset.theme)

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark'
  }

  // Mirror `theme` onto the document: the `data-theme` attribute switches the
  // CSS variables, and the theme-color meta reads its value from `--color-bg`
  // instead of duplicating the hex codes.
  $effect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim())
  })

  onMount(() => {
    // The inline script in `index.html` keeps `data-theme` in sync with the
    // system theme, so this listener only mirrors that into state.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystemTheme = (event) => {
      theme = event.matches ? 'dark' : 'light'
    }
    media.addEventListener('change', followSystemTheme)
    return () => media.removeEventListener('change', followSystemTheme)
  })
</script>

<div class="content">
  <main>
    <UtilityBar {theme} onToggleTheme={toggleTheme} />

    <section id="home" class="home" aria-labelledby="home-title">
      <img class="avatar" src="/pfp.webp" alt="" />
      <div>
        <p class="greeting">Hi, I'm</p>
        <TypedTitle {pseudonym} />
        <p class="tagline">
          I'm a CS undergrad at
          <img class="ui-logo" src="/ui-logo.svg" alt="" />
          <span class="institution">Universitas Indonesia</span><br>
          who likes making things for my own use.
          <span class="tagline-sub">Let's connect!</span>
        </p>
      </div>
    </section>
    <div class="banner" aria-hidden="true"></div>

    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">My stuff</h2>
      <ol>
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
    </section>

    <section id="socials" aria-labelledby="socials-title">
      <h2 id="socials-title">Where to find me</h2>
      <ul class="socials-grid">
        {#each socials as social}
          {@const Icon = social.icon}
          {@const isExternal = social.link.startsWith('http')}
          <li>
            <a
              class="use-link"
              href={social.link}
              target={isExternal ? '_blank' : undefined}
              rel="noreferrer"
            >
              <Icon size={17} />
              <span>
                <span class="item-title">{social.label}</span>
                <span class="item-meta">{social.subtext}</span>
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <section id="hobbies" aria-labelledby="hobbies-title">
      <h2 id="hobbies-title">What I do in my free time</h2>
      <ul>
        {#each hobbies as hobby}
          <li>
            <span class="item-title">{hobby.label}</span>
            <span class="item-meta">{hobby.subtext}</span>
          </li>
        {/each}
      </ul>
    </section>

    <section id="uses" aria-labelledby="uses-title">
      <h2 id="uses-title">Stuff I use</h2>
      <p class="section-sub">Software made by incredible people.<br>My settings for some of these are available in my <a href="https://github.com/athaurian/dotfiles" target="_blank" rel="noreferrer">dotfiles</a>.</p>
      <ul class="uses-grid">
        {#each uses as tool}
          {@const Icon = tool.icon}
          <li>
            <a class="use-link" href={tool.link} target="_blank" rel="noreferrer">
              <Icon size={22} />
              <span>
                <span class="item-title">{tool.label}</span>
                <span class="item-meta">{tool.subtext}</span>
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </section>
  </main>

  <footer>
    <p>Last changed on {lastBuilt}</p>
    <p>Built with <a href="https://svelte.dev" target="_blank" rel="noreferrer">Svelte</a> · <a href="https://github.com/athaurian/athaurian.github.io" target="_blank" rel="noreferrer">View the source</a> on GitHub</p>
  </footer>
</div>
