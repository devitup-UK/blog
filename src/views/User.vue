<template>
  <div class="user">
    <div class="valid-user" v-if="!data.invalid">
    <b-container fluid class="user-header" :style="bannerBackground" v-if="hasUser">
      <b-row no-gutters>
        <b-col class="user-header__content">
            <div class="user-avatar" v-if="hasAvatar" :style="'background-image: url('+ data.user.avatar +')'"></div>
            <div class="user-avatar" v-else>
              <b-avatar :text="data.user.getInitials()" class="user-avatar__image"></b-avatar>
            </div>
          <h1 class="user-name title title--aqua">{{ data.user.name }}</h1>
          <h2 class="user-title">{{ data.user.title }}</h2>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <router-view></router-view>
    </b-container>
    </div>
    <InvalidObject item="user" v-else></InvalidObject>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { $api } from "@/services/wordpress.service.js";
import InvalidObject from "@/components/InvalidObject.vue";
import User from "@/models/User.js";

export default {
  name: "user",
  components: {
    InvalidObject
  },
  data() {
    return {
      data: {
        user: new User(),
        loading: true,
        invalid: false
      },
    };
  },
  metaInfo() {
      return {
        title: this.title + " ~ " + this.data.user.name,
        meta: [
          { name: "description", content: "DevItUp Blog is a collection of articles from the team at DevItUp.co.uk, all posts displayed on this page are written by " + this.data.user.name + "." },
          { name: "keywords", content: "blog, development, software, application, devitup, dev, web, programming, site, mobile, html, css, javascript, profile, team, author, " + this.data.user.name }
        ]
      }
  },
  computed: {
    bannerBackground() {
      let result = '';

      if(this.data.user != null && this.data.user.image != null) {
        result = 'background-image: url('+ this.data.user.image +'); background-size: cover;';
      }

      return result;
    },
    hasUser() {
      return this.data.user != null;
    },
    hasAvatar() {
      return this.userHasProperty('avatar');
    },
    ...mapState(['title'])
  },
  methods: {
    getUser() {
      $api.getUserBySlug(this.$route.params.slug).then((response) => {
        this.data.user = new User(response);
      }).catch(error => {
        error = error.response.data;
        switch(error.code) {
          case "rest_user_cannot_view":
          case "rest_user_invalid_id":
          case "error_no_user":
            this.data.invalid = true;
            break;
        }
      });
    },
    userHasProperty(property) {
      let returnBool = false;

      if(this.data.user != null) {
        if(this.data.user[property] != null) {
          returnBool = true;
        }
      }

      return returnBool;
    }
  },
  created() {
    this.getUser();
  },
};
</script>