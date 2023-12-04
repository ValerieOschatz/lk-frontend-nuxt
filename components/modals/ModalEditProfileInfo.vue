<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Изменить данные:
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-text-field
              variant="underlined"
              label="Имя"
              v-model="name"
              :rules="nameRules"
            ></v-text-field>
            <v-textarea
              variant="underlined"
              label="Информация"
              v-model="description"
              :rules="descriptionRules"
            ></v-textarea>
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
    name: '',
    description: '',
    nameRules: [
      // v => !!v || 'Обязательное поле',
      v => (v.length <= 20) || 'Допустимо не более 20 символов',
      v => (!v || v.length >= 2) || 'Допустимо не менее 2 символов',
    ],
    descriptionRules: [
      v => (v.length <= 50) || 'Допустимо не более 50 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      modalEditProfileInfo: "modalStore/getModalEditProfileInfo",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      editProfileInfo: "profileStore/editProfileInfo",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid) {
        const data = {};
        if (this.name) data.name = this.name;
        if (this.description) data.description = this.description;

        if (!this.name && !this.description) {
          this.dialog = false;
        } else {
          this.editProfileInfo(data);
        }
        this.clear();
      }
    },
    clear() {
      this.name = '';
      this.description = '';
    }
  },
  watch: {
    modalEditProfileInfo() {
      this.dialog = this.modalEditProfileInfo;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalEditProfileInfo', value: false });
        this.clear();
      }
    }
  }
}
</script>
