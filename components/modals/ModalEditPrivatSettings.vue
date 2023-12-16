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
          <v-btn @click="submitForm" color="#5C6BC0">Сохранить</v-btn>
          <v-btn @click="dialog = false" color="#E57373">Отмена</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    comments: false,
    posts: false,
  }),
  computed: {
    ...mapGetters({
      modalEditPrivatSettings: "modalStore/getModalEditPrivatSettings",
      profile: "profileStore/getProfile",
      chanel: "chanelsStore/getChanel",
    }),
    isOpen() {
      return this.modalEditPrivatSettings.isOpen;
    },
    option() {
      return this.modalEditPrivatSettings.option;
    },
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      editPrivatSettings: "profileStore/editPrivatSettings",
      editChaneSettings: "chanelsStore/editPrivatSettings",
    }),
    async submitForm() {
      const data = {
        comments: this.comments,
        posts: this.posts,
      };

      if (this.option === 'profile') {
        this.editPrivatSettings(data);
      } else {
        data.chanelId = this.chanel.id;
        this.editChaneSettings(data);
      }
    },
    setValues() {
      if (this.option === 'profile') {
        this.comments = this.profile.privatSettings.comments ? true : false;
        this.posts = this.profile.privatSettings.posts ? true : false;
      } else {
        this.comments = this.chanel.privatSettings.comments ? true : false;
        this.posts = this.chanel.privatSettings.posts ? true : false;
      }
    }
  },
  watch: {
    profile() {
      if (this.option === 'profile') {
        this.comments = this.profile.privatSettings.comments ? true : false;
      this.posts = this.profile.privatSettings.posts ? true : false;
      }
    },
    chanel() {
      if (this.option === 'chanel') {
        this.comments = this.chanel.privatSettings.comments ? true : false;
        this.posts = this.chanel.privatSettings.posts ? true : false;
      }
    },
    isOpen() {
      this.dialog = this.isOpen;
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
