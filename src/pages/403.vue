<template>
    <div class="error-container">
        <div class="error-content">
            <a-row :gutter="20">
                <a-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                    <div class="error-image">
                        <img class="error-image-img" src="@/assets/403.png"/>
                    </div>
                </a-col>

                <a-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                    <div class="error-text">
                        <div class="error-text-headline">您没有操作权限...</div>
                        <div class="error-text-info">当前帐号没有操作权限,请联系管理员。</div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
    .error-container {
        position: relative;
        height: 100%;

        .error-content {
            position: absolute;
            top: 55%;
            left: 50%;
            width: 40vw;
            height: 400px;
            transform: translate(-50%, -50%);

            .error-image {
                position: relative;
                float: left;
                width: 100%;
                overflow: hidden;

                &-img {
                    width: 100%;
                }
            }

            .error-text {
                position: relative;
                float: left;
                width: 300px;
                padding: 80px 0;
                overflow: hidden;

                &-headline {
                    margin-bottom: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 24px;
                    color: #222;
                    opacity: 0;
                    animation-name: slideUp;
                    animation-duration: 0.5s;
                    animation-delay: 0.1s;
                    animation-fill-mode: forwards;
                }

                &-info {
                    margin-bottom: 30px;
                    font-size: 16px;
                    line-height: 21px;
                    opacity: 0;
                    animation-name: slideUp;
                    animation-duration: 0.5s;
                    animation-delay: 0.2s;
                    animation-fill-mode: forwards;
                }

                @keyframes slideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(60px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        }
    }
</style>
