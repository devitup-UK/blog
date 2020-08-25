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
// @ is an alias to /src
import Banner from '@/components/Banner.vue';
import PopularPosts from '@/components/PopularPosts.vue';


export default {
  name: "home",
  components: {
    Banner,
    PopularPosts
  }
};
</script>
