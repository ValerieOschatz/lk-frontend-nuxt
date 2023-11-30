<template>
  <v-card class="content">
    <ProfileInfo />
  </v-card>
</template>

<script setup>
definePageMeta({
  name: "ProfilePage",
})
</script>

<script>
import { mapActions } from "vuex";
import ProfileInfo from '../components/profile/ProfileInfo.vue'

export default {
  components: {
    ProfileInfo,
  },
  data: () => ({
  }),
  methods: {
    ...mapActions({
    }),
  },
}
</script>

<style scoped>
.content {
  width: 95%;
  height: 95%;
  max-width: 880px;
  margin: auto;
  padding: 40px;
}
</style>