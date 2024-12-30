<template>
    <HeaderComponent />
    <PageHeaderComponent class="animate__animated animate__fadeIn" title="Документы" imgSrc="/src/assets/CircleImages/14.png" />

    <div class="docs-wrapper" v-for="(doc, index) in docs">
        <h1 class="dock" @click="downloadDoc(doc.doc)">{{ doc.name }}</h1>
        <Divider v-if="index < docs.length - 1"></Divider>
    </div>
    <FooterComponent />
</template>

<script lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import DocumentModel from '@/api/modules/documents/document.model';
import { Divider } from 'primevue';

export default {
    name: "DocumentView",
    components: {HeaderComponent, PageHeaderComponent, FooterComponent, Divider},
    data: () => ({
        docs: []
    }),
    async created() {
        const docModel = new DocumentModel()
        //@ts-ignore
        this.docs = (await docModel.getAll()).getData()
    },
    methods: {
        async downloadDoc(url: string) {
            const filename = url.split('/')[url.split('/').length - 1]
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); 
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }
    }
}
</script>
<style scoped>
.docs-wrapper {
    padding-left: 5rem;
    padding-right: 5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
}
.dock {
    font-weight: 600;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease-in-out;
}
.dock:hover {
    opacity: 1;
}
</style>