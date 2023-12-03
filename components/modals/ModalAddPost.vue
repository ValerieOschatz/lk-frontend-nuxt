<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Добавить пост:
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-textarea
              variant="underlined"
              label="Текст"
              v-model="text"
              :rules="textRules"
            ></v-textarea>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              variant="underlined"
              label="Фотографии"
              v-model="image"
            ></v-file-input>
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
    text: '',
    image: null,
    textRules: [
      v => (v.length <= 80) || 'Допустимо не более 80 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      modalAddPost: "modalStore/getModalAddPost",
    }),
  },
  methods: {
    ...mapActions({
      setModalAddPost: "modalStore/setModalAddPost",
      createPost: "postsStore/createPost",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid) {
        const formData = new FormData();
        if (this.text) formData.append('text', this.text);
        if (this.image) formData.append('image', this.image[0]);
        this.createPost(formData);
      }
    }
  },
  watch: {
    modalAddPost() {
      this.dialog = this.modalAddPost;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModalAddPost(false);
      }
    }
  }
}
</script>
