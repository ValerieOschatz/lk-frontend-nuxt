<template>
  <v-card class="content">profile</v-card>
</template>

<script setup>
definePageMeta({
  name: "ProfilePage",
})
</script>

<script>
import { mapActions } from "vuex";
import Alert from '../components/Alert.vue'

export default {
  components: {
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
}
</style>