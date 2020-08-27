<template>
  <div class="home">
    <banner></banner>
    <b-container>
      <popular-posts></popular-posts>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

// @ is an alias to /src
import Banner from '@/components/Banner.vue';
import PopularPosts from '@/components/PopularPosts.vue';


export default {
  name: "home",
  components: {
    Banner,
    PopularPosts
  },
  metaInfo() {
      return {
        title: this.title + " ~ Home",
        meta: [
          { name: "description", content: this.description },
          { name: "keywords", content: "blog, development, software, application, devitup, dev, web, programming, site, mobile, html, css, javascript" }
        ]
      }
  },
  computed: {
    ...mapState(['title']),
    ...mapState(['description'])
  }
};
</script>
