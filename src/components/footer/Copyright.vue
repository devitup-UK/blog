<template>
    <div class="copyright">
    <b-container fluid>
        <b-row class="align-items-center">
            <b-col cols="6">
                <div class="copyright__company">
                    <span>&copy; DevItUp Ltd {{ new Date().getFullYear() }}</span>
                </div>
            </b-col>
            <b-col cols="6">
                <div class="copyright__developer">
                    <a :href="data.portfolioUrl" target="_blank">
                        <img src="../../assets/img/tomaldy-logo.png" alt="TomAldy Logo" title="TomAldy Logo" class="developer-logo">
                    </a>
                </div>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
export default {
    name: 'Copyright',
    data() {
        return {
            data: {
                portfolioUrl: process.env.VUE_APP_PORTFOLIO_URL
            }
        }
    }
}
</script>