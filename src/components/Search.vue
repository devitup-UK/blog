<template>
  <div class="search">
    <b-row>
      <b-col>
        <b-input-group>
          <b-input-group-prepend is-text>
            <font-awesome-icon icon="search"></font-awesome-icon>
          </b-input-group-prepend>
          <b-form-input type="search" :placeholder="placeHolder" class="search-bar" v-model="data.search"></b-form-input>
          <b-input-group-append>
            <b-button variant="dark" class="search__submit" @click="search">Search</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { $api } from "../services/wordpress.service";

export default {
  name: "search",
  props: ['category'],
  data() {
      return {
          data: {
              search: "",
              user: null
          }
      }
  },
  computed: {
      getCategory() {
          if(typeof(this.category) != "undefined") {
              return '#' + this.category.toLowerCase();
          }else{
              return 'latest';
          }
      },
      placeHolder() {
        let text = "Search through ";

        if(typeof(this.category) != "undefined") {
            text += "#" + this.category.toLowerCase();
        }else{
            if(this.data.user != null) {
              text += this.data.user.name + "'s";
            }else{
              text += "latest";
            }
        }

        text += " posts...";

          return text;
      }
  },
  created() {
      this.getUser();
  },
  methods: {
      search() {
          this.$router.push({ path: this.$router.currentRoute.path, query: { search: this.data.search } });
      },
      getUser() {
        if(typeof this.$route.params.id != "undefined") {
          $api.getUserByID(this.$route.params.id).then(user => {
            this.data.user = user;
          })
        }
      }
  }
};
</script>