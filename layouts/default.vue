<template>
  <v-app>
    <div v-if="profile._id" class="page">
      <MobileNavbar v-if="mobile" />
      <Sidebar v-else />
      <v-card class="content">
        <slot />
      </v-card>
    </div>
    <div v-else class="page"></div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sidebar from "~/components/navbar/Sidebar.vue";
import MobileNavbar from "~/components/navbar/MobileNavbar.vue";
export default {
  components: {
    Sidebar,
    MobileNavbar,
  },
  data () {
    return {
      mobile: false,
    }
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
    widthHandler(e) {
      if (window.innerWidth <= 600) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    }
  },
  mounted() {
    if (!this.profile._id) {
      this.setProfile();
    }

    window.addEventListener("resize", this.widthHandler);
    this.widthHandler();
  },
  unmounted() {
    window.removeEventListener("resize", this.widthHandler);
  },
}
</script>

<style scoped>
@import url(../assets/styles/default.css);
</style>
