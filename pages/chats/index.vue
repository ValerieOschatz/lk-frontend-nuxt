<template>
  <div>
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "ChatlListPage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '../components/Alert.vue';

export default {
  components: {
    Alert,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
    }),
  },
}
</script>
