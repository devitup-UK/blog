<template>
  <div class="post-view">
    <template v-if="!data.loading">
      <div class="valid-post" v-if="!data.invalid">
        <b-container
          fluid
          class="post-header"
          v-if="data.post != null && data.post.media.src != null"
          :style="'background-image: url(' + data.post.media.src + ')'"
        >
          <b-row no-gutters>
            <b-col>
              <div class="post-header__content">
                <h1 class="post-title title title--aqua">{{ data.post.title }}</h1>
                <h2 class="post-published">
                  Written by
                  <strong>{{ data.post.author.name }}</strong>
                  on
                  <strong>{{ data.post.getDate() }}</strong>
                </h2>
              </div>
            </b-col>
          </b-row>
        </b-container>
        <b-container>
          <b-row>
            <b-col
              cols="12"
              lg="9"
              v-if="data.post != null"
              v-html="data.post.content"
              class="post-view__content"
            ></b-col>
            <b-col cols="12" lg="3">
              <b-row>
                <b-col cols="4" lg="12">
                  <img class="post-view__author-avatar" v-if="hasAvatar" :src="data.post.author.avatar">
                    <div class="post-view__author-avatar" v-else>
                    <b-avatar :text="data.post.author.getInitials()" class="post-view__author-avatar__image"></b-avatar>
                    </div>
                  <div class="post-view__info">
                    <h3 class="post-view__info__heading">Author</h3>
                    <div class="post-view__info__value">
                      <span>{{ data.post.author.name }}</span>
                    </div>
                  </div>
                </b-col>
                <b-col cols="4" lg="12">
                  <div class="post-view__info">
                    <div class="post-view__info__icon">
                      <font-awesome-icon icon="folder" size="5x"></font-awesome-icon>
                    </div>
                    <h3 class="post-view__info__heading">Category</h3>
                    <div class="post-view__info__value">
                      <span>{{ data.category.getTagName() }}</span>
                    </div>
                  </div>
                </b-col>
                <b-col cols="4" lg="12">
                  <div class="post-view__info">
                    <div class="post-view__info__icon">
                      <font-awesome-icon icon="calendar-alt" size="5x"></font-awesome-icon>
                    </div>
                    <h3 class="post-view__info__heading">Published</h3>
                    <div class="post-view__info__value">
                      <span>{{ data.post.getDate() }}</span>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <InvalidObject item="post" v-else></InvalidObject>
    </template>
    <template v-else>
      <PostRendering></PostRendering>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostRendering from "@/components/post/PostRendering.vue";
import InvalidObject from "@/components/InvalidObject.vue";
import Post from "../models/Post.js";
import { $api } from "@/services/wordpress.service.js";

export default {
  name: "post-view",
  components: {
    PostRendering,
    InvalidObject
  },
  data() {
    return {
      data: {
        post: new Post(),
        loading: true,
        invalid: false,
      },
    };
  },
  computed: {
    hasAvatar() {
      return this.authorHasProperty('avatar');
    },
    ...mapState(['title']),
    ...mapState(['description'])
  },
  created() {
    this.getPost(this.$route.params.slug);
  },
  methods: {
    getPost(slug) {
      $api
        .getPostBySlug(slug)
        .then((post) => {
          post.getCategory().then((category) => {
            post.getThumbnail().then((media) => {
              post.getAuthor().then((author) => {
                this.data.post = post;
                this.data.category = category;
                this.data.post.media = media;
                this.data.post.author = author;
                this.data.loading = false;
              });
            });
          });
        })
        .catch((error) => {
          this.data.loading = false;
          switch (error.code) {
            case "rest_post_invalid_id":
              this.data.invalid = true;
              break;
          }
        });
    },
    authorHasProperty(property) {
      let returnBool = false;

      if(this.data.post.author != null) {
        if(this.data.post.author[property] != null) {
          returnBool = true;
        }
      }

      return returnBool;
    }
  },
  metaInfo() {
      return {
        title: this.title + " ~ " + this.data.post.title,
        meta: [
          { name: "description", content: new DOMParser().parseFromString(this.data.post.excerpt, 'text/html').body.textContent + "..." },
          { name: "keywords", content: "blog, development, software, application, devitup, dev, web, programming, site, mobile, html, css, javascript, post, author, article, news" }
        ]
      }
  },
  
};
</script>