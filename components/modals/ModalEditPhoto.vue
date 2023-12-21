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
    image: null,
  }),
  computed: {
    ...mapGetters({
      modalEditPhoto: "modalStore/getModalEditPhoto",
      chanel: "chanelsStore/getChanel",
    }),
    isOpen() {
      return this.modalEditPhoto.isOpen;
    },
    option() {
      return this.modalEditPhoto.option;
    },
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      editProfilePhoto: "profileStore/editProfilePhoto",
      editChanelPhoto: "chanelsStore/editChanelPhoto",
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
          if (this.option === 'profile') {
            this.editProfilePhoto(formData);
          } else {
            formData.append('chanelId', this.chanel._id);
            this.editChanelPhoto(formData);
          }
        }
        this.clear();
      }
    },
    clear() {
      this.image = null;
    }
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalEditPhoto', value: false });
        this.clear();
      }
    }
  }
}
</script>
