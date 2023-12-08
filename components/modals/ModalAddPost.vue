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
              label="Фото"
              v-model="image"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submitForm" color="#7B1FA2">Сохранить</v-btn>
          <v-btn @click="dialog = false" color="#C2185B">Отмена</v-btn>
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
      v => (v.length <= 500) || 'Допустимо не более 500 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      modalAddPost: "modalStore/getModalAddPost",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
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
        if (!this.text && !this.image) {
          this.dialog = false;
        } else {
          this.createPost(formData);
        }
        this.clear();
      }
    },
    clear() {
      this.text = '';
      this.image = null;
    }
  },
  watch: {
    modalAddPost() {
      this.dialog = this.modalAddPost;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalAddPost', value: false });
        this.clear();
      }
    }
  }
}
</script>
