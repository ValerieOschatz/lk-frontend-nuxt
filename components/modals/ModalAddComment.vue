<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-title>
          Добавить комментарий:
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-textarea
              variant="underlined"
              label="Новый комментарий"
              v-model="text"
              :rules="textRules"
            ></v-textarea>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    text: '',
    image: null,
    textRules: [
      v => !!v || 'Обязательное поле',
      v => (v.length <= 150) || 'Допустимо не более 150 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      modalAddComment: "modalStore/getModalAddComment",
      selectedPostId: "postsStore/getSelectedPostId",
    }),
    isOpen() {
      return this.modalAddComment.isOpen;
    },
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      createComment: "commentsStore/createComment",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid) {
        const data = {
          post: this.selectedPostId,
          text: this.text,
        };
        
        this.createComment(data);
        this.text = '';
      }
    },
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalAddComment', value: false });
        this.text = '';
      }
    }
  }
}
</script>
