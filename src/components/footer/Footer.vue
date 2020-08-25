<template>
    <footer>
    <b-container>
        <b-row class="justify-content-center">
            <b-col md="8" lg="6">
                <div class="footer__logo">
                    <router-link to="/">
                        <img src="../../assets/img/logo.png" title="Logo" alt="logo">
                    </router-link>
                </div>
                <div class="footer__navigation">
                    <navigation-bar class="navbar--footer"></navigation-bar>
                </div>
                <ul class="footer__social-links">
                    <li class="footer__social-link">
                        <a href="https://twitter.com/devitupuk" target="_blank">
                            <font-awesome-icon :icon="['fab', 'twitter']" size="2x" fixed-width />
                        </a>
                    </li>
                    <li class="footer__social-link">
                        <a href="https://www.instagram.com/devitup/" target="_blank">
                            <font-awesome-icon :icon="['fab', 'instagram']" size="2x" fixed-width />
                        </a>
                    </li>
                    <li class="footer__social-link">
                        <a href="https://www.pinterest.co.uk/devitup/" target="_blank">
                            <font-awesome-icon :icon="['fab', 'pinterest']" size="2x" fixed-width />
                        </a>
                    </li>
                </ul>
            </b-col>
        </b-row>
    </b-container>
</footer>
</template>

<script>
import NavigationBar from '../navigation/NavigationBar.vue'

export default {
    name: 'Footer',
    components: {
        NavigationBar
    }
  }
</script>