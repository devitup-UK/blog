<template>
  <div class="posts">
    <Search :category="category" v-if="!data.loading && data.posts.length"></Search>
    <div v-if="data.loading" class="text-center">
      <div class="loading-posts">
        <font-awesome-icon icon="spinner" size="5x" spin></font-awesome-icon>
        <div class="loading-posts__message">Fetching Posts...</div>
      </div>
    </div>
    <post-component v-for="post in data.posts" :model="post" v-bind:key="post.id" v-else></post-component>
    <pagination :paging="data.paging" v-if="!data.loading && data.posts.length"></pagination>
    <template v-if="!data.loading && !data.posts.length">
        <div class="no-posts">
          <font-awesome-icon icon="sad-tear" size="8x"></font-awesome-icon>
          <div class="no-posts__message">{{ noPostsMessage }}</div>
        </div>
    </template>
  </div>
</template>

<script>
import PostComponent from "@/components/post/Post.vue";
import Post from "@/models/Post";
import Pagination from "@/components/Pagination.vue";
import Search from "@/components/Search.vue";
import { $api } from "@/services/wordpress.service.js";

export default {
  name: "posts",
  props: ["posts", "category", "user"],
  components: {
    PostComponent,
    Pagination,
    Search
  },
  data() {
    return {
      data: {
        loading: true,
        posts: [],
        paging: null,
      },
    };
  },
  computed: {
    noPostsMessage() {
      let searchTermSupplied = typeof this.$route.query.search == "undefined" ? false : true;
      let userIdfSupplied = typeof this.$route.params.id == "undefined" ? false : true;
      let message = "There are no posts in this area.";

      if (this.category != null) {
        message = "This category currently has no posts.";
      }

      if(userIdfSupplied) {
        message = "Unfortunately, the user has not made any posts yet.";
      }

      if(searchTermSupplied) {
        message = "Unfortunately, no posts matched your search term.";
      }

      return message;
    }
  },
  watch: {
    "$route.params.page": function (page) {
      this.getPosts(page, this.category);
    },
    "$route.params.id": function (userId) {
      this.getPosts(this.$route.params.page, this.category, userId);
    },
    "$route.query.search": function () {
      this.getPosts(this.$route.params.page, this.category);
    },
    category: function (category) {
      this.getPosts(this.$route.params.page, category);
    },
  },
  methods: {
    getPosts(page, category = null, userId = null) {
      let pageNumber = typeof page == "undefined" ? 1 : page;
      let searchTermSupplied = typeof this.$route.query.search == "undefined" ? false : true;
      let searchTerm = this.$route.query.search;

      let _vm = this;
      _vm.$store.commit("updateLoadingStatus", true);
      _vm.data.isLoading = true;

      let request = $api
              .posts();

      // Maybe we should pass the category into the Posts object, then we have the ID available, rather than doing it here?

      if (category != null) {
        $api
          .getCategoryBySlug(category)
          .then(function (response) {
            // .slug() queries will always return as an array
            let categoryObject = response[0];

            _vm.$store.commit("updateLoadingStatus", false);

            request = request
              .categories(categoryObject.id)
              .search(searchTermSupplied ? searchTerm : '')
              .perPage(5)
              .page(pageNumber);


            return request;
          })
          .then((posts) => {
            this.formatPosts(posts);
          })
          .catch((error) => {
            this.$store.commit("triggerError", { code: 100, detail: error });
          });
      } else {
          _vm.$store.commit("updateLoadingStatus", false);

          if(userId != null) {
            request = request.param('author', userId);
          }

          request = request
              .search(searchTermSupplied ? searchTerm: '')
              .perPage(5)
              .page(pageNumber);

        request
          .then((posts) => {
            this.formatPosts(posts);
          })
          .catch((error) => {
            this.$store.commit("triggerError", { code: 100, detail: error });
          });
      }
    },
    formatPosts(posts) {
      let formattedPosts = [];
      
      posts.forEach((post, index) => {
        formattedPosts[index] = new Post(post);
      });

      this.data.paging = posts._paging;
      this.data.posts = formattedPosts;

      this.data.loading = false;
    }
  },

  created() {
    this.getPosts(this.$route.params.page, this.category, this.$route.params.id);
  },
};
</script>