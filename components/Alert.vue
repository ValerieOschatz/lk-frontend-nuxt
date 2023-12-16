<template>
  <div class="alert">
    <v-alert
      v-model="alertOpen"
      variant="tonal"
      :icon="icon"
      closable
      close-label="Close Alert"
      :color="color"
    >
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    alertOpen: false,
  }),
  computed: {
    ...mapGetters({
      alert: "alertStore/getAlert",
    }),
    isOpen() {
      return this.alert.isOpen;
    },
    text() {
      return this.alert.text;
    },
    color() {
      return this.alert.color;
    },
    icon() {
      return this.alert.icon;
    }
  },
  methods: {
    ...mapActions({
      closeAlert: "alertStore/closeAlert",
    }),
  },
  watch: {
    isOpen() {
      this.alertOpen = this.isOpen;
    },
    alertOpen() {
      if (this.alertOpen === false) this.closeAlert();
    }
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>