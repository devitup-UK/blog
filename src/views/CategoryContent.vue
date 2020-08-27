<template>
  <div class="category-content">
    <b-container
      fluid
      class="category-header"
      v-if="data.category != null && data.category.image != null"
    >
      <b-row no-gutters>
        <b-col class="category-header__content">
          <b-img :src="data.category.image" class="category-image" fluid></b-img>
          <div class="category-image__overlay"></div>
          <h1 class="category-title">{{ title }}</h1>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>


<script>
import { mapState } from "vuex";
import CategoryModel from "@/models/Category";
import { $api } from "@/services/wordpress.service.js";

export default {
  name: "category-content",
  props: {
    title: String,
    id: Number,
  },
  data() {
    return {
      data: {
        category: null,
      },
    };
  },
  watch: {
    title(oldValue, newValue) {
      if (oldValue != newValue) {
        this.getCategory();
        // this.getPosts();
      }
    },
  },
  created() {
    this.getCategory();
  },
  methods: {
    // getPosts(page) {
    //   let _vm = this;
    //   _vm.$store.commit('updateLoadingStatus', true);
    //   _vm.data.isLoading = true;
    //   $api.categories().slug(this.title.match(/[A-Z][a-z]+/g).join('-').toLowerCase())
    // .then(function( response ) {
    //     // .slug() queries will always return as an array
    //     let categoryObject = response[0];
    //     console.log(new CategoryModel(categoryObject));
    //     _vm.data.category = new CategoryModel(categoryObject);

    //     _vm.$store.commit('updateLoadingStatus', false);

    //     let pageNumber = typeof(page) == 'undefined' ? 1 : page;

    //   return $api.posts().categories(categoryObject.id).perPage(5).page(pageNumber)
    // }).then(posts => {

    //     let formattedPosts = [];

    //     posts.forEach((post, index) => {
    //         formattedPosts[index] = new Post(post);
    //     });

    //     // this.data.paging = posts._paging;
    //     this.data.posts = formattedPosts;

    //     this.data.loading = false;

    //   }).catch(() => {
    //     this.$store.commit('triggerError', 100);
    //   });
    // },
    getCategory() {
      let _vm = this;
      _vm.$store.commit("updateLoadingStatus", true);
      _vm.data.isLoading = true;
      $api
        .categories()
        .slug(
          this.title
            .match(/[A-Z][a-z]+/g)
            .join("-")
            .toLowerCase()
        )
        .then(function (response) {
          // .slug() queries will always return as an array
          let categoryObject = response[0];
          _vm.data.category = new CategoryModel(categoryObject);

          _vm.$store.commit("updateLoadingStatus", false);
        });
    },
  },
  metaInfo() {
      return {
        title: this.siteTitle + " ~ " + this.title,
        meta: [
          { name: "description", content: "DevItUp Blog is a collection of articles from the team at DevItUp.co.uk, all posts displayed on this page are apart of the " + this.title + " category." },
          { name: "keywords", content: "blog, development, software, application, devitup, dev, web, programming, site, mobile, html, css, javascript, " + this.title.toLowerCase() }
        ]
      }
  },
  computed: mapState({
    siteTitle: state => state.title
  })
};
</script>