<template>
    <article class="row post">
	
	<!-- Photo -->
    <b-col cols="12" lg="4" class="post-thumbnail" v-if="!data.loading" :style="'background-image: url(' + data.post.media.src + ')'"></b-col>
	
	<!-- Details -->
	<b-col cols="12" lg="8" class="post-content" v-if="!data.loading">
		<div class="post-content__header">
            <h2>
                <router-link :to="{ name: 'post', params: { slug: data.post.slug }}">{{ data.post.title }}</router-link>
            </h2>
            <h3>{{ data.post.category.getTagName() }}</h3>
        </div>
		
		<div class="post-content__excerpt" v-html="data.post.content"></div>
        
        <ul class="post-metadata">
            <li class="post-metadata__author">
                <font-awesome-icon icon="user" fixed-width></font-awesome-icon>
                <span>
                    <router-link :to="{ name: 'user', params: { slug: data.post.author.slug }}">{{ data.post.author.name }}</router-link>
                </span>
            </li>
            <li class="post-metadata__publish-date">
                <font-awesome-icon icon="calendar-alt" fixed-width></font-awesome-icon>
                <span>{{ data.post.getDate() }}</span>
            </li>
            <li class="post-metadata__category">
                <font-awesome-icon icon="folder" fixed-width></font-awesome-icon>
                <span>
                    <router-link :to="{ name: 'category.' + data.post.category.name.toLowerCase() }">{{ data.post.category.getTagName() }}</router-link>
                </span>
            </li>
        </ul>
    </b-col>

    <post-loading v-if="data.loading"></post-loading>

</article>
</template>

<script>
import PostLoading from './PostLoading.vue';

export default {
    name: 'post',
    components: {
        PostLoading
    },
    props: ['model'],
    data() {
        return {
            data: {
                post: this.model,
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