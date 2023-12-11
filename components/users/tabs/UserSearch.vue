<template>
  <div>
    <FormSearchUser />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import FormSearchUser from "~/components/forms/FormSearchUser.vue";

export default {
  components: {
    FormSearchUser,
  },
  data: () => ({
  }),
}
</script>
