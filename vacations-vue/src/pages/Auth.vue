<script setup>
import Loading from '@/components/Loading.vue';
import Dialog from '@/components/Dialog.vue';
import { getAuth } from '@/services/apiCalls';
import { HttpStatusCode } from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';




const route = useRoute();
const router = useRouter();

const isLoading = ref(true);

//DIALOG 
const isDialogOpen = ref(false);
const dialogText = ref('');




const authenticateUser = async () => {
    isLoading.value = true;

    try {
        const token = route.query.token;
        if (!token) {
            isDialogOpen.value = true;
            dialogText.value = "Query param 'token' não encontrado";

            setTimeout(() => {
                router.push('/');
            }, 3000);

            return;
        }

        const res = await getAuth(token);
        if (res.status == HttpStatusCode.Ok) {
            const user = res.data.user;

            localStorage.setItem('user', JSON.stringify(user));
            router.push('/vacations');
        }
    } catch(e) {
        isDialogOpen.value = true;

        if (e.response.data.error) {
            dialogText.value = e.response.data.error;
        } else dialogText.value = "Algo deu errado, tente novamente mais tarde";

        setTimeout(() => {
            router.push('/');
        }, 3000);
    }
}




onMounted(() => authenticateUser());

</script>








<template>

    <main class="content">

        <Loading v-if="isLoading" />
        
        <p class="title-txt">Autenticando...</p>

    </main>




    <Dialog 
    :is-open="isDialogOpen"
    status="error"
    :text="dialogText"
    />

</template>








<style scoped>

.content {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}




.spinner {
    width: 75px;
    height: 75px;
}

.title-txt {
    font-size: xx-large;
}

</style>