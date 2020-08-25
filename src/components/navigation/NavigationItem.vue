<template>
<b-nav-item :to="to">
    <slot></slot>
</b-nav-item>
</template>

<script>
export default {
    name: 'NavigationItem',
    props: {
        to: String
    }
}
</script>