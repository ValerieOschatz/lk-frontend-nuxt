<template>
  <v-card class="content">
    <ProfileInfo
      :user="profile"
      :privatSettings="privatSettings"
      :owner="true"
    />
  </v-card>
</template>

<script setup>
definePageMeta({
  name: "ProfilePage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import ProfileInfo from '../components/profile/ProfileInfo.vue'

export default {
  components: {
    ProfileInfo,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      privatSettings: "profileStore/getPrivatSettings",
    }),
  },
  methods: {
    ...mapActions({
      setProfile: "profileStore/setProfile",
    }),
  },
  mounted() {
    if (this.profile && !this.profile.id) {
      this.setProfile();
    }
  }
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