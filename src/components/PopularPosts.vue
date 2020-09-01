<template>
  <div class="popular-posts">
    <h1 class="title title--aqua">Popular Posts</h1>
    <b-row class="featured-posts">
      <b-carousel
        id="carousel-1"
        v-model="data.slide"
        indicators
        :interval="0"
        img-width="1200"
        img-height="340"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide img-blank v-for="slide in data.slides" :key="slide.index">
            <featured-post v-for="post in slide.posts" :key="post.id" :post="post"></featured-post>
        </b-carousel-slide>
      </b-carousel>
    </b-row>
  </div>
</template>

<script>
import FeaturedPost from "@/components/post/featured-post/FeaturedPost.vue";
import Post from "@/models/Post";
import { $api } from "@/services/wordpress.service.js";
import { divideArray } from "@/helpers/array.helper.js";

export default {
  name: "PopularPosts",
  components: {
    FeaturedPost,
  },
  data() {
    return {
      data: {
        loading: true,
        posts: [],
        slides: [],
        slide: 0,
        sliding: null,
      },
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    onSlideStart() {
      this.data.sliding = true;
    },
    onSlideEnd() {
      this.data.sliding = false;
    },
    getPosts() {
      $api
        .posts()
        .then((posts) => {
          let popularPosts = [];

          posts.forEach((post, index) => {
            if (index <= 8) {
              popularPosts[index] = new Post(post);
            }
          });

          popularPosts.sort((a, b) => a.views - b.views);

          divideArray(popularPosts, 3).forEach((postGroup, index) => {
              if(index <= 2) {
                  this.data.slides.push({
                      index: index,
                      posts: postGroup
                  })
              }
          });

          this.data.posts = popularPosts;

          this.data.loading = false;
        })
        .catch((error) => {
          this.$store.commit("triggerError", { code: 100, detail: error });
        });
    },
  },
};
</script>