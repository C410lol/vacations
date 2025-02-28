<script setup>
import { reactive, ref } from 'vue';


const user = reactive({
    _id: null,
    name: 'Caio Gomes',
    email: null
});

const vacationsExists = ref(null);

</script>




<template>

    <main class="content">

        <div class="user-info">
            <p class="user-txt">Olá, {{ user.name }}</p>

            <div class="vacation-status">
                <p class="vacation-txt">
                    {{ vacationsExists ? 'Férias escolhidas' : 'Férias ainda não escolhidas' }}
                </p>
            </div>
        </div>

        <hr class="division-line" />

    </main>

</template>




<style scoped>

.content {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}




.user-info {
    height: 40px;
    width: 100%;
    max-width: 750px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.user-txt {
    font-size: x-large;
    font-weight: 600;
}

</style>