<!-- Identity rail for the homepage. -->
<script>
  import { Check, Mail } from '@lucide/svelte'
  import DiscordMark from './DiscordMark.svelte'
  import GithubMark from './GithubMark.svelte'
  import LinkedInMark from './LinkedInMark.svelte'
  import TypedTitle from './TypedTitle.svelte'
  import UiMark from './UiMark.svelte'
  import XMark from './XMark.svelte'

  const pseudonym = 'athaurian'
  const discordUsername = 'athaurian'

  let copied = false
  let copyTimer

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text)
      copied = true
      clearTimeout(copyTimer)
      copyTimer = setTimeout(() => (copied = false), 1600)
    } catch {
      // Clipboard access can be blocked; leave the tooltip unchanged.
    }
  }

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
      label: 'Discord',
      link: null,
      subtext: discordUsername,
      copy: discordUsername,
      icon: DiscordMark,
    },
    {
      label: 'Email',
      link: 'mailto:athaurian@duck.com',
      subtext: 'Best way to reach me',
      icon: Mail,
    },
  ]

</script>

<aside id="home" class="identity" aria-labelledby="home-title">
  <div class="identity-inner">
    <img class="avatar" src="/pfp.webp" alt="" width="80" height="80" decoding="async" />
    <p class="greeting">Hi, I'm</p>
    <TypedTitle {pseudonym} />
    <p class="tagline">
      I'm a CS undergrad at
      <UiMark />
      <span class="institution">Universitas Indonesia</span>,
      and I like making things for my own use.
      <span class="tagline-sub">Let's connect!</span>
    </p>
    <ul id="socials" class="connect-links">
      {#each socials as social}
        {@const Icon = social.icon}
        {@const tooltip = `${social.label}: ${social.subtext}`}
        <li>
          {#if social.link}
            <a
              href={social.link}
              target={social.link.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={social.label}
              title={tooltip}
            >
              <Icon size={18} />
            </a>
          {:else if social.copy}
            <button
              type="button"
              class="connect-copy"
              class:is-copied={copied}
              aria-label={tooltip}
              title={tooltip}
              data-copy={social.copy}
              onclick={() => copyText(social.copy)}
            >
              {#if copied}
                <Check size={18} />
              {:else}
                <Icon size={18} />
              {/if}
            </button>
          {:else}
            <span class="connect-static" role="img" aria-label={tooltip} title={tooltip}>
              <Icon size={18} />
            </span>
          {/if}
        </li>
      {/each}
    </ul>
    <span class="sr-only" aria-live="polite">
      {copied ? `Copied ${discordUsername} to clipboard` : ''}
    </span>
    <nav class="site-nav" aria-label="Site">
      <a href="/about/">About</a>
      <a href="/writing/">Writing</a>
    </nav>
    <p class="identity-quote">Less is more.</p>
  </div>
</aside>
