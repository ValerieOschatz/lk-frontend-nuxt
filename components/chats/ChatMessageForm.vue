<template>
<v-form
  ref="form"
>
  <v-textarea
    variant="underlined"
    label="Сообщение"
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    text: '',
    textRules: [
      // v => !!v || 'Обязательное поле',
      v => (v.length <= 500) || 'Допустимо не более 500 символов',
    ],
  }),
  methods: {
    ...mapActions({
      createComment: "commentsStore/createComment",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid && this.text) {
        this.text = '';
      }
    },
  }
}
</script>
