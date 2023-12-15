<template>
<v-form
  class="mx-auto"
  ref="form"
>
  <v-card-text>
    <v-text-field
      density="compact"
      variant="solo"
      label="Введите название"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="name"
      @input="onSearch()"
    ></v-text-field>
  </v-card-text>
</v-form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    tab: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    name: '',
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapMutations({
      setOwnChanelName: "chanelsStore/setOwnChanelName",
    }),
    ...mapActions({
      setOwnChanelList: "chanelsStore/setOwnChanelList",
    }),
    onSearch() {
      if (this.tab === 1) {
      } else if (this.tab === 2) {
      } else if (this.tab === 3) {
        this.setOwnChanelName(this.name);
        this.setOwnChanelList({ owner: this.profile.id, name: this.name });
      }
    }
  },
}
</script>
