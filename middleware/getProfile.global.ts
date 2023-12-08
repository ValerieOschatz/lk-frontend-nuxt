export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) return;
  const token = useCookie('jwt');
  if (token.value) {
    if (to.path === '/sign-in' || to.path === '/sign-up') {
      return abortNavigation();
    }
    return;
  } else {
    return navigateTo('/sign-in');
  }
})
