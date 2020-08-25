<template>
    <b-navbar toggleable="lg" type="light">
    <b-container>
            <b-navbar-brand to="/">
                <img src="../../assets/img/logo.png" alt="DevItUp Logo">
            </b-navbar-brand>
        
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <navigation-bar class="ml-auto"></navigation-bar>
            </b-collapse>
    </b-container>
</b-navbar>
</template>

<script>
import NavigationBar from './NavigationBar.vue'

export default {
    name: 'Navigation',
    props: {
      msg: String
    },
    components: {
        NavigationBar
    }
  }
</script>