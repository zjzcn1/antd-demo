<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" width="240" collapsible>
            <a-layout-header class="logo">
                <img src="../assets/logo.png"/>
                <span>{{collapsed ? '' : '测试系统'}}</span>
            </a-layout-header>
            <a-menu class="menu" theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
                <template v-for="(item, index) in $router.options.routes">
                    <a-sub-menu :index="item.path + index" :key="index"
                                v-if="!item.meta.hidden && !item.meta.leaf">
                        <template #title>
                            <component :is="item.meta.icon"></component>
                            <span>{{item.meta.title}}</span>
                        </template>
                        <template v-for="child in item.children">
                            <a-menu-item :index="child.path" :key="child.path"
                                         v-if="!child.meta.hidden">
                                <router-link :to="child.path">
                                    <component :is="child.meta.icon"></component>
                                    <span>{{child.meta.title}}</span>
                                </router-link>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                    <a-menu-item v-if="!item.meta.hidden && item.meta.leaf"
                                  :index="item.children[0].path" :key="index">
                        <router-link :to="item.children[0].path">
                            <component :is="item.children[0].meta.icon"></component>
                            <span>{{item.children[0].meta.title}}</span>
                        </router-link>
                    </a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="header">
                <component class="collapse-icon"
                           :is="$antIcons[collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined']"
                           @click="() => (collapsed = !collapsed)"/>

                <a-breadcrumb>
                    <a-breadcrumb-item v-for="(item, index) in $route.matched" :to="item.path" :key="index">
                        {{ item.meta.title }}
                    </a-breadcrumb-item>
                </a-breadcrumb>

                <div class="user">
                    <UserOutlined/>
                    <span style="margin-left: 8px">张三</span>
                </div>
            </a-layout-header>
            <a-layout-content class="content">
                <div class="container">
                    <router-view></router-view>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    setup() {
      return {
        selectedKeys: ref(['1']),
        collapsed: ref(false),
      };
    },
  });
</script>

<style lang="less" scoped>

    @header_height: 50px;

    .scrollbar() {
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background: #8b939e;
        }
    }

    .logo {
        padding: 0;
        height: @header_height;
        line-height: @header_height;

        img {
            margin-left: 22px;
            height: 30px;
            width: 30px;
            vertical-align: middle;
        }

        span {
            padding-left: 24px;
            font-size: 18px;
            font-weight: 400;
            color: #fff;
        }
    }

    .menu {
        .scrollbar();
        height: calc(100vh - @header_height);
    }

    .header {
        background: #fff;
        padding: 0;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 2px 6px 0 rgb(124 104 104 / 10%);

        > * {
            display: inline-block
        }

        .collapse-icon {
            font-size: 16px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .collapse-icon:hover {
            color: #1890ff;
        }

        .user {
            float: right;
            margin-right: 24px
        }
    }

    .content {
        .scrollbar();
        height: calc(100vh - @header_height);

        .container {
            background: #fff;
            margin: 24px;
            height: calc(100vh - @header_height - 48px);
        }
    }

</style>
