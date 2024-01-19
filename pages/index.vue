<template></template>

<!-- <script setup>
definePageMeta({
  middleware: [
    function() {
      if (process.client) return;
      const token = useCookie('jwt');
      if (token.value) {
        return navigateTo('/profile');
      } else {
        return navigateTo('/sign-in');
      }
    }
  ],
})
</script> -->

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapActions({
      setProfile: "profileStore/setProfile",
    }),
  },
  watch: {
    profile() {
      if (this.profile._id) {
        navigateTo('/profile');
      }
    }
  },
  mounted() {
    if (this.profile._id) {
      navigateTo('/profile');
    }
  }
}
</script>
