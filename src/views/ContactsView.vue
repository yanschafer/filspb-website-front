<script lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
    name: "ContactsView",
    components: {HeaderComponent, FooterComponent},
}

</script>
<template>
    <HeaderComponent />
    <FooterComponent />
</template>
<style scoped></style>