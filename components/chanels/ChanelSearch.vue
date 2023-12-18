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
      setSearchedChanelName: "chanelsStore/setSearchedChanelName",
      setSubscriptionChanelName: "chanelsStore/setSubscriptionChanelName",
    }),
    ...mapActions({
      setOwnChanelList: "chanelsStore/setOwnChanelList",
      setSearchedChanelList: "chanelsStore/setSearchedChanelList",
      setSubscriptionChanelList: "chanelsStore/setSubscriptionChanelList",
    }),
    onSearch() {
      if (this.tab === 1) {
        this.setSubscriptionChanelName(this.name);
        this.setSubscriptionChanelList({ name: this.name, subscriptions: this.profile.id });
      } else if (this.tab === 2) {
        this.setSearchedChanelName(this.name);
        this.setSearchedChanelList({ name: this.name });
      } else if (this.tab === 3) {
        this.setOwnChanelName(this.name);
        this.setOwnChanelList({ owner: this.profile.id, name: this.name });
      }
    }
  },
  mounted() {
    this.setSubscriptionChanelName(this.name);
    this.setSearchedChanelName(this.name);
    this.setOwnChanelName(this.name);
  }
}
</script>
