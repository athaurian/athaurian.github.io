<script>
  import { Eye } from '@lucide/svelte'

  const moonIcon =
    'M12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6m8-9.31V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12z'
  const sunIcon =
    'M12 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4m0 10a6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6m8-9.31V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12z'

  let { theme, onToggleTheme } = $props()

  let themeIcon = $derived(theme === 'dark' ? moonIcon : sunIcon)

  let wallpaperUrl = $derived(
    theme === 'dark'
      ? 'https://github.com/athaurian/athaurian.github.io/blob/main/wallpapers/background-white-blossoms-black-sharp.webp'
      : 'https://github.com/athaurian/athaurian.github.io/blob/main/wallpapers/background-white-plum-blossoms-watercolor-sharp.webp',
  )
</script>

<div class="utility">
  <a
    class="icon-button"
    href={wallpaperUrl}
    target="_blank"
    rel="noreferrer"
    aria-label="View the unblurred wallpaper on GitHub"
    title="View the unblurred wallpaper on GitHub"
  >
    <Eye size={17} />
  </a>
  <button
    class="icon-button"
    type="button"
    onclick={onToggleTheme}
    aria-label="Toggle theme"
    aria-pressed={theme === 'dark'}
    title="Toggle theme"
  >
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={themeIcon} />
    </svg>
  </button>
</div>
