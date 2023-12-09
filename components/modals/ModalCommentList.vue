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
          <v-list lines="three">
            <div v-for="item in items" :key="item.id">
              <v-divider></v-divider>
              <v-list-item
                :prepend-avatar="item.qwe && `http://localhost:3001/${item.photo}`"
                :prepend-icon="!item.qwe && 'mdi-account-circle-outline'"
                :title="item.name"
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
      v => (v.length <= 80) || 'Допустимо не более 80 символов',
    ],
    items: [
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        name: 'Brunch this weekend?',
        text: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        name: 'Summer BBQ',
        text: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        name: 'Oui oui',
        text: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
 
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        name: 'Birthday gift',
        text: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        name: 'Recipe to try',
        text: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
  computed: {
    ...mapGetters({
      modalCommentList: "modalStore/getModalCommentList",
      selectedPostId: "postsStore/getSelectedPostId",
    }),
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
    modalCommentList() {
      this.dialog = this.modalCommentList;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalCommentList', value: false });
      } else {
        this.setValues();
      }
    }
  }
}
</script>
