<template>
    <div class="pagination">
    <ul class="pagination-pages" v-if="paging.totalPages > 1">
        <li v-for="number in paging.totalPages" class="pagination-pages__item" :key="number">
            <router-link :to="{ name: $route.name.replace('.page', '') + '.page', params: { page: number }}">
                {{ number }}
            </router-link>
        </li>
    </ul>
    <div class="current-page">
        <div class="current-page__previous" v-if="paging.totalPages > 1">
            <router-link :to="{ name: $route.name.replace('.page', '')  + '.page', params: { page: $route.params.page == null ? 1 - 1 : $route.params.page - 1 }}">
                <font-awesome-icon icon="chevron-left" fixed-width></font-awesome-icon>
            </router-link>
        </div>
        <div class="current-page__number">
            <span>{{ currentPage }}</span>
        </div>
        <div class="current-page__next" v-if="paging.totalPages > 1 && currentPage != paging.totalPages">
            <router-link :to="{ name: $route.name.replace('.page', '')  + '.page', params: { page: $route.params.page == null ? 1 + 1 : parseInt($route.params.page) + 1 }}">
                <font-awesome-icon icon="chevron-right" fixed-width></font-awesome-icon> 
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'pagination',
    props: [
        'paging'
    ],
    computed: {
        currentPage() {
            return this.$route.params.page == null ? 1 : this.$route.params.page;
        }
    }
}
</script>