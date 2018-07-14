<template>
<li class="side-menu-item" :key="menu.name" :class="{'expand':expanded}">
    <template v-if="isFolder">
        <a class="side-menu-folder" @click.prevent="toggleMenu(menu)">{{menu.title}}<i class="icon caret right"></i></a>
        <ul class="side-menu-sub">
            <ts-menu-item v-for="item in menu.children" :key="item.name" :menu="item"></ts-menu-item>
        </ul>
    </template>
    <template v-else>
        <a class="side-menu-leaf" :class="{'active':selected==menu.uniqueNo}" @click.prevent="clickMenuItem(menu)">{{menu.title}}</a>
    </template>
</li>
</template>
<script>
export default {
    name: 'ts-menu-item',
    props: {
        menu: Object,
    },
    data() {
        return {
            selected:false
        }
    },
    created() {
        this.$taber.$on('vue-tabpanel-active-change', (tab) => {
            if (tab) {
                this.selected = tab.params.uniqueNo
            } else {
                this.selected = null
            }
        })
    },
    mounted() {
        this.clickMenuItem({
            title: '首页',
            name: '首页',
            path: '/homepage',
            allowClose: false,
            uniqueNo: 'homepage'
        });
    },
    computed: {
        isFolder() {
            if (this.menu.children) {
                return this.menu.children.length > 0;
            }
            return false;
        },
        expanded(){
            return this.menu.expand
        }
    },
    methods: {
        clickMenuItem(item) {
            this.selected = item.uniqueNo;

            this.$taber.open({
                name: item.path,
                key: item.id,
                title: item.name,
                allowClose: item.allowClose,
                params: {
                    title: item.name,
                    guid: item.guid,
                    uniqueNo: item.uniqueNo
                }
            })
        },
        toggleMenu(menu) {
            console.info('toggle:', menu);
            if (!menu.expand) {
                menu.expand = true;
            } else {
                menu.expand = !menu.expand;
            }
        }
    }
}
</script>
