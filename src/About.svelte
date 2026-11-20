<!-- About page. Edit the copy below. -->
<script>
  import BashMark from './BashMark.svelte'
  import CMark from './CMark.svelte'
  import CppMark from './CppMark.svelte'
  import DockerMark from './DockerMark.svelte'
  import ExpressMark from './ExpressMark.svelte'
  import GitMark from './GitMark.svelte'
  import GithubActionsMark from './GithubActionsMark.svelte'
  import JavaScriptMark from './JavaScriptMark.svelte'
  import LatexMark from './LatexMark.svelte'
  import LuaMark from './LuaMark.svelte'
  import NeovimMark from './NeovimMark.svelte'
  import NodeMark from './NodeMark.svelte'
  import OpenCodeMark from './OpenCodeMark.svelte'
  import PageBar from './PageBar.svelte'
  import PythonMark from './PythonMark.svelte'
  import SvelteMark from './SvelteMark.svelte'
  import TypeScriptMark from './TypeScriptMark.svelte'
  import ViteMark from './ViteMark.svelte'

  const updated = new Date(`${__BUILD_DATE__}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  const groups = [
    {
      label: 'Languages',
      items: [
        { label: 'C', icon: CMark },
        { label: 'Python', icon: PythonMark },
        { label: 'JavaScript', icon: JavaScriptMark },
        { label: 'TypeScript', icon: TypeScriptMark },
        { label: 'Bash', icon: BashMark },
        { label: 'Lua', icon: LuaMark },
        { label: 'C++', icon: CppMark },
      ],
    },
    {
      label: 'Frameworks',
      items: [
        { label: 'Svelte', icon: SvelteMark },
        { label: 'Vite', icon: ViteMark },
        { label: 'Node.js', icon: NodeMark },
        { label: 'LaTeX', icon: LatexMark },
        { label: 'Express', icon: ExpressMark },
      ],
    },
    {
      label: 'Tools',
      items: [
        { label: 'Neovim', icon: NeovimMark },
        { label: 'OpenCode', icon: OpenCodeMark },
        { label: 'Docker', icon: DockerMark },
        { label: 'Git', icon: GitMark },
        { label: 'GitHub Actions', icon: GithubActionsMark },
      ],
    },
  ]
</script>

<main class="reader">
  <PageBar current="about" />

  <header id="content">
    <h1>About</h1>
    <p class="page-lede">
      Hi. My name is Ilham, and I'm a CS undergraduate @ <span
        class="institution"
        ><img class="ui-logo" src="/ui-logo.svg" alt="" /> Universitas Indonesia</span
      >.
    </p>
    <p class="page-lede">
      Among other things, I love making stuff for my own use because the process
      is itself a form of self-reflection. I also appreciate the things that are
      beautiful by nature.
    </p>
    <p class="page-lede">Thank you for visiting my little corner of the web.</p>
    <p class="page-lede">
      I'll see you around campus (or wherever else life takes us).
    </p>
  </header>

  <div class="prose">
    <h2>Toolbox</h2>
    <div class="stack">
      {#each groups as group}
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
      <dd>Geist / Geist Mono / Merriweather / Homemade Apple</dd>
    </dl>
  </div>
</main>
