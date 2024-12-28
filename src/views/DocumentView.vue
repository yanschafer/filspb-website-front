<template>
    <div v-for="doc in docs">
        <h1 @click="downloadDoc(doc.url)">{{ doc.name }}</h1>
    </div>
</template>

<script lang="ts">
import DocumentModel from '@/api/modules/documents/document.model';

export default {
    name: "DocumentView",
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