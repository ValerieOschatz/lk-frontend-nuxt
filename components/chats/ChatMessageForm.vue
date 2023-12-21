<template>
<v-form
  ref="form"
>
  <v-textarea
    bg-color="#E8EAF6"
    label="Новое сообщение"
    v-model="text"
    :rules="textRules"
  ></v-textarea>
  <v-btn
    @click="submitForm"
    color="rgb(179, 91, 67)"
    variant="text"
    size="small"
    block>
      Отправить
  </v-btn>
</v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    text: '',
    textRules: [
      v => (v.length <= 500) || 'Допустимо не более 500 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      chat: "chatsStore/getChat",
    }),
    otherParticipants() {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user._id;
      return [userId];
    }
  },
  methods: {
    ...mapActions({
      createChat: "chatsStore/createChat",
      createMessage: "messagesStore/createMessage",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid && this.text) {
        if (this.$route.path === '/chats/new') {
          this.createChat({ otherParticipants: this.otherParticipants, text: this.text });
        } else {
          this.createMessage({ text: this.text, chat: this.chat._id });
        }
        this.text = '';
      }
    },
  }
}
</script>
