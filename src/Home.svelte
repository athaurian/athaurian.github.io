<!-- Homepage: projects, hobbies, and the tools I use. -->
<script>
  import { onMount } from 'svelte'
  import { ChevronDown } from '@lucide/svelte'
  import BashMark from './BashMark.svelte'
  import CachyOSMark from './CachyOSMark.svelte'
  import HeliumMark from './HeliumMark.svelte'
  import Identity from './Identity.svelte'
  import KittyMark from './KittyMark.svelte'
  import MpvMark from './MpvMark.svelte'
  import NeovimMark from './NeovimMark.svelte'
  import ObsidianMark from './ObsidianMark.svelte'
  import SwayMark from './SwayMark.svelte'

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

  onMount(() => {
    openHashTarget()
    window.addEventListener('hashchange', openHashTarget)

    return () => window.removeEventListener('hashchange', openHashTarget)
  })
</script>

<main id="content" class="split home">
  <Identity />

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
