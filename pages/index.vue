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
  mounted() {
    if (!this.profile._id) {
      this.setProfile();
    }
  }
}
</script>
