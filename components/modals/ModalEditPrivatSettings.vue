<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Настройки приватности:
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-checkbox
              label="Разрешить комментарии"
              v-model="comments"
              color="#B388FF"
            ></v-checkbox>
            <v-checkbox
              label="Посты видны всем"
              v-model="posts"
              color="#B388FF"
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submitForm">Сохранить</v-btn>
          <v-btn @click="dialog = false">Отмена</v-btn>
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
    comments: false,
    posts: false,
  }),
  computed: {
    ...mapGetters({
      modalEditPrivatSettings: "modalStore/getModalEditPrivatSettings",
      privatSettings: "profileStore/getPrivatSettings",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      editPrivatSettings: "profileStore/editPrivatSettings",
    }),
    async submitForm() {
      const data = {
        comments: this.comments,
        posts: this.posts,
      };

      this.editPrivatSettings(data);
    },
    setValues() {
      this.comments = this.privatSettings.comments ? true : false;
      this.posts = this.privatSettings.posts ? true : false;
    }
  },
  watch: {
    privatSettings() {
      this.comments = this.privatSettings.comments ? true : false;
      this.posts = this.privatSettings.posts ? true : false;
    },
    modalEditPrivatSettings() {
      this.dialog = this.modalEditPrivatSettings;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalEditPrivatSettings', value: false });
      } else {
        this.setValues();
      }
    }
  }
}
</script>
