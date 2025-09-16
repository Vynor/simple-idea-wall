<template>
    <div class="home">
        <nav>
            <RouterLink to="/now">
                <el-button 
                type="primary"
                size="large"
                >
                    Go to Edit
                </el-button>
            </RouterLink>
            <RouterLink to="/floating">
                <el-button 
                type="primary"
                size="large"
                >
                    Go to Floating
                </el-button>
            </RouterLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
    @include flex-center();
    height: 100vh;
    nav {
        @include flex-center(column);
        justify-content: space-around;
        height: 20%;
    }
}
</style>