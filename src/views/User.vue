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
import { $api } from "@/services/wordpress.service.js";
import InvalidObject from "@/components/InvalidObject.vue";

export default {
  name: "user",
  components: {
    InvalidObject
  },
  data() {
    return {
      data: {
        user: null,
        loading: true,
        invalid: false
      },
    };
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
    }
  },
  methods: {
    getUser() {
      $api.getUserBySlug(this.$route.params.slug).then((response) => {
        this.data.user = response;
      }).catch(error => {
        console.log(error);
        switch(error.code) {
          case "rest_user_cannot_view":
            this.data.invalid = true;
            break;
          case "rest_user_invalid_id":
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