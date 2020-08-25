<template>
    <div class="error">
    <b-alert show variant="danger">{{ error.message }}</b-alert>
</div>
</template>

<script>
import { transformErrorCodeToMessage } from '@/transformers/error.transformer.js';

export default {
    name: 'error',
    computed: {
        error() {
            let error = this.$store.state.error;
            error.message = transformErrorCodeToMessage(error.code);
            return error;
        }
    }
}
</script>