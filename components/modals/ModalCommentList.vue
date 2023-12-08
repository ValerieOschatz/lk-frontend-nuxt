<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      scrollable
    >
      <v-card>
        <!-- <v-card-title>
          Комментарии:
        </v-card-title> -->
        <v-toolbar color="rgb(220, 205, 235)">
          <v-btn variant="text" icon="mdi-menu"></v-btn>
          <v-toolbar-title>Комментарии</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn variant="text" icon="mdi-magnify"></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form
            v-if="adding"
            ref="form"
          >
            <v-textarea
              variant="underlined"
              label="Информация"
              v-model="description"
              :rules="descriptionRules"
            ></v-textarea>
          </v-form>
          <v-list
            :items="items"
            item-props
            lines="three"
          >
            <template v-slot:subtitle="{ subtitle }">
              <div v-html="subtitle"></div>
            </template>
          </v-list>
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submitForm">Сохранить</v-btn>
          <v-btn @click="dialog = false">Отмена</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions> -->
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
    adding: false,
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
    items: [
      { type: 'subheader', title: 'Today' },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ',
        subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
  computed: {
    ...mapGetters({
      modalEditProfileInfo: "modalStore/getModalEditProfileInfo",
      profile: "profileStore/getProfile",
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
        const data = {
          name: this.name,
          description: this.description
        };

        this.editProfileInfo(data);
      }
    },
    setValues() {
      this.name = this.profile.name;
      this.description = this.profile.description;
    }
  },
  watch: {
    profile() {
      this.name = this.profile.name;
      this.description = this.profile.description;
    },
    modalEditProfileInfo() {
      this.dialog = this.modalEditProfileInfo;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalEditProfileInfo', value: false });
      } else {
        this.setValues();
      }
    }
  }
}
</script>
