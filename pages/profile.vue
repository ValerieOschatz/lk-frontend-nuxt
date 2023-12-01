<template>
  <v-card class="content">
    <ProfileInfo
      :user="profile"
      :privatSettings="privatSettings"
      :owner="true"
    />
    <ProfilePostList 
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
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import ProfilePostList from '../components/profile/ProfilePostList.vue';

export default {
  components: {
    ProfileInfo,
    ProfilePostList,
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
  width: calc(100% - 20px);
  max-width: 880px;
  margin: 20px auto;
  padding: 40px;
}
</style>