import { createCookieSessionStorage } from '@remix-run/node'

const { commitSession, getSession } = createCookieSessionStorage({
  cookie: {
    path: '/',
    sameSite: 'lax',
    name: 'theme',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 100),
    secure: true,
  },
})

export async function getThemeSession(request) {
  const themeSession = await getSession(request.headers.get('Cookie'))

  return {
    getTheme: () => themeSession.get('theme') || null,
    setTheme: (theme) => themeSession.set('theme', theme),
    commit: async () => commitSession(themeSession),
  }
}