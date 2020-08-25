<template>
    <div class="banner">
    <b-container>
        <b-row>
            <b-col>
                <h1 class="banner__title">{{ data.title }}</h1>
                <p class="banner__introduction">{{ data.description }}</p>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import { $api } from "@/services/wordpress.service.js";

export default {
    name: 'banner',
    data() {
        return {
            data: {
                title: null,
                description: null
            }
        }
    },
    created() {
        this.getSiteInfo();
    },
    methods: {
        getSiteInfo() {
            $api.getSiteInfo().then(info => {
                this.data.title = info.title;
                this.data.description = info.description;
            })
        }
    }
}
</script>