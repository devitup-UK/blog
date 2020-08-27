<template>
  <div id="app">
    <error v-if="error.status"></error>
    <loading></loading>
    <navigation></navigation>
    <main>
      <router-view/>
    </main>
    <DevItUpFooter></DevItUpFooter>
    <copyright></copyright>
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation.vue'
import DevItUpFooter from '@/components/footer/Footer.vue'
import Copyright from '@/components/footer/Copyright.vue'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'
import { $api } from '@/services/wordpress.service.js';

export default {
  name: 'app',
  components: {
    Navigation,
    DevItUpFooter,
    Copyright,
    Loading,
    Error
  },
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  created() {
    this.getSiteInfo();
  },
  methods: {
    getSiteInfo() {
      $api.getSiteInfo().then((info) => {
        this.$store.commit('setTitle', info.title);
        this.$store.commit('setDescription', info.description);
      });
    },
  },
}
</script>

<style lang="scss">
  @import './assets/styles/app.scss';
</style>
