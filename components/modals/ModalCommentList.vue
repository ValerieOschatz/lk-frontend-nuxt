<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      height="500"
      scrollable
    >
      <v-card>
        <v-toolbar color="rgb(220, 205, 235)">
          <v-toolbar-title>Комментарии</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn variant="text" icon="mdi-close" @click="dialog = false"></v-btn>
        </v-toolbar>
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
            <v-btn variant="text" color="#7B1FA2" size="x-small" block @click="submitForm">Отправить</v-btn>
          </v-form>
          <v-list v-if="commentList.length" lines="three">
            <div v-for="item in commentList" :key="item.id">
              <v-divider></v-divider>
              <v-list-item
                :prepend-avatar="item.owner.photo && `http://localhost:3001/${item.owner.photo}`"
                :prepend-icon="!item.owner.photo && 'mdi-account-circle-outline'"
                :title="item.owner.name"
                :subtitle="item.text"
                nav
                height="60"
              >
              </v-list-item>
            </div>
          </v-list>
        </v-card-text>
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
    textRules: [
      v => (v.length <= 150) || 'Допустимо не более 150 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      modalCommentList: "modalStore/getModalCommentList",
      selectedPostId: "postsStore/getSelectedPostId",
      commentList: "commentsStore/getCommentList",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      createComment: "commentsStore/createComment",
      setCommentList: "commentsStore/setCommentList",
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
    modalCommentList() {
      this.dialog = this.modalCommentList;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalCommentList', value: false });
        this.text = '';
      }
    },
    selectedPostId() {
      this.setCommentList({ post: this.selectedPostId });
    }
  }
}
</script>
