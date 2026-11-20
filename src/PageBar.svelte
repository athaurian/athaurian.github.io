<!-- Top bar for pages that stand on their own, without the identity rail. -->
<script>
  let { current } = $props()
</script>

<header class="page-bar">
  <a class="page-bar-home" href="/" aria-label="athaurian, home">
    <span class="page-bar-avatar-frame">
      <img class="page-bar-avatar" src="/pfp.webp" alt="" width="40" height="40" decoding="async" />
    </span>
  </a>
  <nav aria-label="Site">
    <a href="/about/" aria-current={current === 'about' ? 'page' : undefined}>About</a>
    <a href="/writing/" aria-current={current === 'writing' ? 'page' : undefined}>Writing</a>
  </nav>
</header>
