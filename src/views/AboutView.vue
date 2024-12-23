<script lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";

export default {
    name: "AboutView",
    components: {HeaderComponent, FooterComponent, PageHeaderComponent},
}

</script>
<template>
    <HeaderComponent />
    <PageHeaderComponent class="animate__animated animate__fadeIn" title="О нас" imgSrc="/src/assets/CircleImages/head_about.png" />
    <FooterComponent />
</template>
<style scoped></style>