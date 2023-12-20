<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Редактировать сообщение:
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-textarea
              variant="underlined"
              label="Сообщение"
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
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    text: '',
    textRules: [
      v => (v.length <= 500) || 'Допустимо не более 500 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      modalEditMessage: "modalStore/getModalEditMessage",
      selectedMessage: "messagesStore/getSelectedMessage",
    }),
    isOpen() {
      return this.modalEditMessage.isOpen;
    }
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      updateMessage: "messagesStore/updateMessage",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid && this.text) {
        const data = {
          messageId: this.selectedMessage._id,
          text: this.text,
        };

        this.updateMessage(data);
      }
    },
    setValues() {
      this.text = this.selectedMessage.text;
    }
  },
  watch: {
    selectedMessage() {
      this.text = this.selectedMessage ? this.selectedMessage.text : '';
    },
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalEditMessage', value: false });
      } else {
        this.setValues();
      }
    }
  }
}
</script>
