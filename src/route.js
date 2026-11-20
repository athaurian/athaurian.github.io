// Paths are rewritten to the same shell at build time, so the page name comes from the URL.
export function routeFromPath(pathname) {
  const path = pathname.replace(/\/+$/, '')

  if (path === '' || path === '/index.html') return { name: 'home' }
  if (path === '/about') return { name: 'about' }
  if (path === '/writing') return { name: 'writing' }

  return { name: 'missing' }
}
