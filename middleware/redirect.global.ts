export default defineNuxtRouteMiddleware((to, from) => {
  // if (process.client) return;
  // const token = useCookie('jwt');
  // if (token.value) {
  //   if (to.path === '/' || to.path === '/sign-in' || to.path === '/sign-up') {
  //     return navigateTo('/profile');
  //   }
  //   return;
  // } else {
  //   if (to.path !== '/sign-in') {
  //     return navigateTo('/sign-in');
  //   }
  //   return;
  // }
  return;
})
