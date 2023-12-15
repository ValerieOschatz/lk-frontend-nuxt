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
    name: '',
    description: '',
    nameRules: [
      v => !!v || 'Обязательное поле',
      v => (v && v.length <= 20) || 'Допустимо не более 20 символов',
      v => (v && v.length >= 2) || 'Допустимо не менее 2 символов',
    ],
    descriptionRules: [
      v => (v.length <= 50) || 'Допустимо не более 50 символов',
    ],
  }),
  computed: {
    ...mapGetters({
      modalEditInfo: "modalStore/getModalEditInfo",
      profile: "profileStore/getProfile",
      chanel: "chanelsStore/getChanel",
    }),
    isOpen() {
      return this.modalEditInfo.isOpen;
    },
    option() {
      return this.modalEditInfo.option;
    },
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      editProfileInfo: "profileStore/editProfileInfo",
      editChanelInfo: "chanelsStore/editChanelInfo",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid) {
        const data = {
          name: this.name,
          description: this.description
        };

        if (this.option === 'profile') {
          this.editProfileInfo(data);
        } else {
          data.chanelId = this.chanel.id;
          this.editChanelInfo(data);
        }
      }
    },
    setValues() {
      if (this.option === 'profile') {
        this.name = this.profile.name;
        this.description = this.profile.description;
      } else {
        this.name = this.chanel.name;
        this.description = this.chanel.description;
      }
    }
  },
  watch: {
    profile() {
      if (this.option === 'profile') {
        this.name = this.profile.name;
        this.description = this.profile.description;
      }
    },
    chanel() {
      if (this.option === 'chanel') {
        this.name = this.chanel.name;
        this.description = this.chanel.description;
      }
    },
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalEditInfo', value: false });
      } else {
        this.setValues();
      }
    }
  }
}
</script>
