<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-text>
          Выйти из профиля?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="logout">Да</v-btn>
          <v-btn @click="dialog = false">Нет</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Alert />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '~/components/Alert.vue';

export default {
  components: {
    Alert,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      modalLogout: "modalStore/getModalLogout",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      logout: "authStore/logout",
    }),
  },
  watch: {
    modalLogout() {
      this.dialog = this.modalLogout;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalLogout', value: false });
      }
    }
  }
}
</script>
