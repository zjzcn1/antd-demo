<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" width="240" :trigger="null" collapsible>
            <a-layout-header class="logo">
                <img src="../assets/logo.png"/>
                <span>{{collapsed?'':'测试系统'}}</span>
            </a-layout-header>
            <a-menu class="menu" theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
                <a-menu-item key="1">
                    <user-outlined/>
                    <span>nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <video-camera-outlined/>
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined/>
                    <span>nav 3</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined/>
                    <span>nav 3</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined/>
                    <span>nav 3</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined/>
                    <span>nav 3</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined/>
                    <span>nav 3</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined/>
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="header">
                <menu-unfold-outlined
                        v-if="collapsed"
                        class="collapse-btn"
                        @click="() => (collapsed = !collapsed)"
                />
                <menu-fold-outlined
                        v-else
                        class="collapse-btn"
                        @click="() => (collapsed = !collapsed)"/>

                <a-breadcrumb>
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
                    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
                    <a-breadcrumb-item>An Application</a-breadcrumb-item>
                </a-breadcrumb>

                <div class="user">
                    <user-outlined/>
                    <span style="margin-left: 8px">张三</span>
                </div>
            </a-layout-header>
            <a-layout-content class="content">
                <div style="background: #fff; margin: 24px; height: 500px">hehe</div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    components: {
      UserOutlined,
      VideoCameraOutlined,
      UploadOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },

    setup() {
      return {
        selectedKeys: ref(['1']),
        collapsed: ref(false),
      };
    },
  });
</script>

<style lang="less" scoped>

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

        img {
            margin-left: 22px;
            height: 30px;
            width: 30px;
            vertical-align: middle;
        }

        span {
            padding-left: 24px;
            color: #fff;
            font-size: 18px;
            font-weight: 400;
        }
    }

    .menu {
        .scrollbar();
        height: calc(100vh - 64px)
    }

    .header {
        background: #fff;
        padding: 0;

        > * {
            display: inline-block
        }

        .collapse-btn {
            font-size: 18px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .collapse-btn:hover {
            color: #1890ff;
        }

        .user {
            float: right;
            margin-right: 24px
        }
    }

    .content {
        .scrollbar();
        height: calc(100vh - 64px);
    }

</style>
