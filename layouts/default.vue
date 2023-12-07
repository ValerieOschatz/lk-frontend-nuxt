<template>
  <v-app>
    <div class="page">
      <Sidebar />
      <slot />
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sidebar from "~/components/Sidebar.vue";
export default {
  components: {
    Sidebar
  },
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
    if (!this.profile.id) {
      this.setProfile();
    }
  }
}
</script>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background-color: rgb(234, 223, 255);
  display: flex;
}
</style>
