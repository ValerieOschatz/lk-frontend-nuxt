<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-textarea
              variant="underlined"
              :label="title"
              v-model="text"
              :rules="textRules"
            ></v-textarea>
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
import { mapGetters, mapMutations, mapActions } from "vuex";

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
      selectedPost: "postsStore/getSelectedPost",
      selectedComment: "commentsStore/getSelectedComment",
    }),
    isOpen() {
      return this.modalAddComment.isOpen;
    },
    option() {
      return this.modalAddComment.option;
    },
    title() {
      return this.modalAddComment.option === 'create' ? 'Добавить комментарий:' : 'Редактировать комментарий';
    }
  },
  methods: {
    ...mapMutations({
      setSelectedComment: "commentsStore/setSelectedComment",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      createComment: "commentsStore/createComment",
      updateComment: "commentsStore/updateComment",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      let data;
      
      if (valid) {
        if (this.option === 'create') {
          data = {
            post: this.selectedPost._id,
            text: this.text,
          };
          this.createComment(data);
        } else {
          data = {
            commentId: this.selectedComment._id,
            text: this.text,
          }
          this.updateComment(data);
        }
        this.setSelectedComment(null);
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
        this.setSelectedComment(null);
        this.text = '';
      }
    },
    selectedComment() {
      this.text = this.selectedComment ? this.selectedComment.text : '';
    }
  }
}
</script>
