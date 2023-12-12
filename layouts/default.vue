<template>
  <v-app>
    <div class="page">
      <Sidebar />
      <v-card class="content">
        <slot />
      </v-card>
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
  background-color: #C5CAE9;
  display: flex;
}
.content {
  width: calc(100% - 20px);
  max-width: 880px;
  margin: 20px auto;
  padding: 40px;
}
</style>
