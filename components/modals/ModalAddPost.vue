<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-toolbar
          color="rgb(220, 205, 235)"
          title="Добавить пост"
        ></v-toolbar>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-text-field
              variant="underlined"
              label="Текст"
              v-model="text"
              :rules="textRules"
            ></v-text-field>
            <v-file-input
              multiple
              accept="image/png, image/jpeg, image/bmp"
              variant="underlined"
              label="Фотографии"
              v-model="files"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Alert />
  </div>
</template>

<script>
import Alert from '~/components/Alert.vue';

export default {
  components: {
    Alert,
  },
  data: () => ({
    dialog: false,
    text: '',
    files: [],
    textRules: [
      v => (v && v.length <= 80) || 'Допустимо не более 80 символов',
    ],
  }),
  methods: {
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;

      if (valid) {
        this.register({
          name: this.name,
          login: this.login,
          password: this.password
        });
      }
    }
  }
}
</script>
