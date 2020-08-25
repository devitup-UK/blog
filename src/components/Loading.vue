<template>
    <div class="loading-screen" :class="{ 'loading-screen--fadeout': !isLoading }">
    <div class="loading-screen__content">
        <div class="loader">
            <div class="square-spin"><div>
            </div></div>
        </div>
        <p>Loading...</p>
    </div>
</div>
</template>

<script>
export default {
    name: "Loading",
    computed: {
        isLoading() {
            return this.$store.state.isLoading
        }
    }
}
</script>