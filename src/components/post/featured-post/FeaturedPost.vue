<template>
  <b-col cols="12" sm="12" md="6" lg="4">
      <router-link :to="{ name: 'post', params: { slug: data.post.slug }}" v-if="!data.loading">
      <div class="featured-post" :style="'background-image: url(' + data.post.media.src + ')'">
    <div class="featured-post__content">
        <div class="featured-post__details">
      <h2>{{ data.post.title }}</h2>
      <h3>
        Written by
        <strong>{{ data.post.author.name }}</strong><br>
        <small><i>{{ data.post.getDate() }}</i></small>
      </h3>
        </div>
    </div>
      </div>
      </router-link>
      <FeaturedPostLoading v-else></FeaturedPostLoading>
  </b-col>
</template>

<script>
import FeaturedPostLoading from '@/components/post/featured-post/FeaturedPostLoading.vue';

export default {
    name: "FeaturedPost",
    props: [
        "post"
    ],
    components: {
        FeaturedPostLoading
    },
    data() {
        return {
            data: {
                post: this.post,
                loading: true
            }
        }
    },
    created() {
        const apiCalls = [];

        const categoryCall = this.data.post.getCategory().then(category => {
            this.data.post.category = category;
        });

        apiCalls.push(categoryCall);

        const authorCall = this.data.post.getAuthor().then(author => {
            this.data.post.author = author;
        });

        apiCalls.push(authorCall);

        if(this.data.post.media.id != 0) {
            const thumbnailCall = this.data.post.getThumbnail().then(media => {
                this.data.post.media = media;
            });

            apiCalls.push(thumbnailCall);
        }

        Promise.all(apiCalls).then(() => {
            this.data.loading = false;
        });
    }
}
</script>