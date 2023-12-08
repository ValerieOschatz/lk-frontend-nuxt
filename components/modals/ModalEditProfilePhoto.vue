<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Изменить фото:
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              variant="underlined"
              label="Фото"
              v-model="image"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submitForm" color="#7B1FA2">Сохранить</v-btn>
          <v-btn @click="dialog = false" color="#C2185B">Отмена</v-btn>
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
    image: null,
  }),
  computed: {
    ...mapGetters({
      modalEditProfilePhoto: "modalStore/getModalEditProfilePhoto",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      editPhoto: "profileStore/editProfilePhoto",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;
      
      if (valid) {
        const formData = new FormData();
        if (this.image) formData.append('image', this.image[0]);
        if (!this.image) {
          this.dialog = false;
        } else {
          this.editPhoto(formData);
        }
        this.clear();
      }
    },
    clear() {
      this.image = null;
    }
  },
  watch: {
    modalEditProfilePhoto() {
      this.dialog = this.modalEditProfilePhoto;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalEditProfilePhoto', value: false });
        this.clear();
      }
    }
  }
}
</script>
