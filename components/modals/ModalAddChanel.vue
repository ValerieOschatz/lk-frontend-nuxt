<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Новый канал:
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-text-field
              variant="underlined"
              label="Название"
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
      modalAddChanel: "modalStore/getModalAddChanel",
    }),
    isOpen() {
      return this.modalAddChanel.isOpen;
    },
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      // editProfileInfo: "profileStore/editProfileInfo",
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

        // this.editProfileInfo(data);
      }
    },
    // setValues() {
    //   this.name = this.profile.name;
    //   this.description = this.profile.description;
    // }
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalAddChanel', value: false });
      } else {
        // this.setValues();
      }
    }
  }
}
</script>
