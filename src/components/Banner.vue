<template>
  <div class="banner">
    <b-container>
      <b-row>
        <b-col>
          <h1 class="banner__title">{{ title }}</h1>
          <p class="banner__introduction">{{ description }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "banner",
  computed: {
      ...mapState(['title']),
      ...mapState(['description'])
  },
};
</script>