<template>
    <b-navbar-nav :class="classes">
    <navigation-item v-for="item in items" v-bind:key="item.label" v-bind:data="item.label" :to="item.to">{{ item.label }}</navigation-item>
</b-navbar-nav>
</template>

<script>
import NavigationItem from './NavigationItem.vue'

export default {
    name: 'NavigationBar',
    components: {
      NavigationItem
    },
    props: {
      classes: []
    },
    computed: {
      items() {
        return this.$store.state.navigation
      }
    }
  }
</script>