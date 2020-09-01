<template>
  <b-container>
    <b-row>
      <b-col>
        <div class="not-found">
          <div class="dropshadow-box dropshadow-box--error">
            <div class="error-visual">
              <img :src="data.image" class="error-visual__image" />
            </div>
            <div class="error-message">
                <p>Unfortunately, that page could not be found.</p>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Image from "@/assets/img/errors/404.gif";

export default {
  name: "NotFound",
  components: {},
  data() {
    return {
      data: {
        image: Image,
      },
    };
  },
  metaInfo() {
      return {
        title: this.title + " ~ 404 Page Not Found",
        meta: [
          { name: "description", content: "Error 404 - Unfortunately, that page cannot be found." },
          { name: "keywords", content: "blog, development, software, application, devitup, dev, web, programming, site, mobile, html, css, javascript, error, not-found, 404" }
        ]
      }
  },
  computed: {
    ...mapState(['title']),
  }
};
</script>