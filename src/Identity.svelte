<!-- Identity rail for the homepage. -->
<script>
  import { Mail } from '@lucide/svelte'
  import GithubMark from './GithubMark.svelte'
  import LinkedInMark from './LinkedInMark.svelte'
  import TypedTitle from './TypedTitle.svelte'
  import XMark from './XMark.svelte'

  const pseudonym = 'athaurian'
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

</script>

<aside id="home" class="identity" aria-labelledby="home-title">
  <div class="identity-inner">
    <img class="avatar" src="/pfp.webp" alt="" width="80" height="80" decoding="async" />
    <p class="greeting">Hi, I'm</p>
    <TypedTitle {pseudonym} />
    <p class="tagline">
      I'm a CS undergrad at
      <img class="ui-logo" src="/ui-logo.svg" alt="" />
      <span class="institution">Universitas Indonesia</span>,
      and I like making things for my own use.
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
            title={`${social.label}: ${social.subtext}`}
          >
            <Icon size={18} />
          </a>
        </li>
      {/each}
    </ul>
    <nav class="site-nav" aria-label="Site">
      <a href="/about/">About</a>
    </nav>
    <p class="identity-quote">Less is more.</p>
  </div>
</aside>
