// Page metadata shared by the app shell and the static build.
export const siteName = 'athaurian'
export const titleSeparator = ' - '

export const pages = {
  about: {
    title: 'About',
    description: 'Who athaurian is, what he builds, and how this site is put together.',
  },
  writing: {
    title: 'Writing',
    description: 'Writing by athaurian.',
  },
  missing: {
    title: 'Page not found',
    description: 'That link does not point anywhere.',
  },
}

export function formatTitle(title) {
  return `${title}${titleSeparator}${siteName}`
}
