<template>
<ul class="list-unstyled">
    <ts-menu-item v-for="menu in menus" class="side-menu-item" :key="menu.name" :menu="menu"></ts-menu-item>
</ul>
</template>
<script>
import TsMenuItem from './menu-item.vue'
export default {
    name: 'sidebar-menu',
    components: {
        TsMenuItem
    },
    props: {
        menus: Array,
    },
    data() {
        return {}
    },
    created() {},
    computed: {},
    methods: {

    }
}
</script>
