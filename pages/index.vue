<template></template>

<script setup>
definePageMeta({
  middleware: [
    function() {
      const token = useCookie('jwt');
      if (token.value) {
        return navigateTo('/profile')
      } else {
        return navigateTo('/sign-in')
      }
    }
  ],
})
</script>
