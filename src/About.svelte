<!-- About page. Edit the copy below. -->
<script>
  import PageBar from './PageBar.svelte'
  import { stackGroups } from './tools.js'
  import UiMark from './UiMark.svelte'

  const updated = new Date(`${__BUILD_DATE__}T00:00:00Z`).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    },
  )
</script>

<main id="content" class="reader">
  <PageBar current="about" />

  <header>
    <h1>About</h1>
    <p class="intro">
      Hi. My name is Ilham, and I'm a CS undergraduate @ <span
        class="institution"
        ><UiMark /> Universitas Indonesia</span
      >.
    </p>
    <p class="intro">
      Most of what I make is for my own use. I like to think that the process
      says something about me. It probably doesn't.
    </p>
  </header>

  <div class="prose">
    <p>
      When I'm not studying, I'm usually listening to music or reading on the
      commute, partly so I don't go insane.
    </p>
    <h2>My stuff</h2>
    <p>
      I published <a href="https://github.com/athaurian/dotfiles"
        >my entire desktop setup</a
      >. It took ages to get right, and it was worth every minute.
    </p>

    <h2>Tech</h2>
    <div class="stack">
      {#each stackGroups as group}
        <section
          class="stack-group"
          aria-labelledby={`stack-${group.label.toLowerCase()}`}
        >
          <h3 id={`stack-${group.label.toLowerCase()}`}>{group.label}</h3>
          <ul class="stack-list">
            {#each group.items as item}
              {@const Icon = item.icon}
              <li>
                <Icon size={18} />
                <span>{item.label}</span>
              </li>
            {/each}
          </ul>
        </section>
      {/each}
    </div>

    <h2>Colophon</h2>
    <dl class="colophon">
      <dt>Repository</dt>
      <dd>
        <a href="https://github.com/athaurian/athaurian.github.io"
          >github.com/athaurian/athaurian.github.io</a
        >
      </dd>
      <dt>Updated</dt>
      <dd><time datetime={__BUILD_DATE__}>{updated}</time></dd>
      <dt>Built with</dt>
      <dd>Svelte / Vite / GitHub Pages</dd>
      <dt>Typefaces</dt>
      <dd>Geist / Merriweather / Homemade Apple</dd>
    </dl>

    <hr />
    <p class="sign-off">
      Thanks for stopping by. If you're also at UI, say hello!
    </p>
  </div>
</main>
