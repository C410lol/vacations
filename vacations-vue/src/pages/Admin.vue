<script setup>
import Dialog from '@/components/Dialog.vue';
import draggableComponent from 'vuedraggable';
import Loading from '@/components/Loading.vue';
import { getChoosePeriod, getUsersByPostion, changeUsersPosition, changeChoosePeriod } from '@/services/apiCalls';
import { HttpStatusCode } from 'axios';
import { onMounted, ref } from 'vue';







// Choose Period
const choosePeriod = ref(true);
const isChoosePeriodLoading = ref(true);

// Users by position
const usersList = ref([]);
const isUsersLoading = ref(true);

// DIALOG
const dialogOpened = ref(false);
const dialogStatus = ref();
const dialogText = ref();








const loadChoosePeriod = async () => {
    isChoosePeriodLoading.value = true;
    try {
        const res = await getChoosePeriod();
        if (res.status == HttpStatusCode.Ok) {
            choosePeriod.value = res.data.choosePeriod;
        }
    } catch (e) {
        const error = e.response;
        if (error) {
            openDialog('error', error.data.error);
        } else openDialog('error', 'Algo deu errado, tente novamente mais tarde');
    } finally {
        isChoosePeriodLoading.value = false;
    }
}

const loadUsersByPosition = async () => {
    isUsersLoading.value = true;
    try {
        const res = await getUsersByPostion();
        if (res.status == HttpStatusCode.Ok) {
            usersList.value = res.data;
        }
    } catch (e) {
        const error = e.response;
        if (error) {
            openDialog('error', error.data.error);
        } else openDialog('error', 'Algo deu errado, tente novamente mais tarde');
    } finally {
        isUsersLoading.value = false;
    }
}

const changeChoosePeriodL = async () => {
    isChoosePeriodLoading.value = true;
    try {
        const res = await changeChoosePeriod(!choosePeriod.value);
        if (res.status == HttpStatusCode.Ok) {
            choosePeriod.value = !choosePeriod.value;
            openDialog('success', 'Período de escolha editado com sucesso');
        }
    } catch (e) {
        const error = e.response;
        if (error) {
            openDialog('error', error.data.error);
        } else openDialog('error', 'Algo deu errado, tente novamente mais tarde');
    } finally {
        isChoosePeriodLoading.value = false;
    }
}

const changeUsersPositionL = async () => {
    isUsersLoading.value = true;
    try {
        const res = await changeUsersPosition(usersList.value);
        if (res.status == HttpStatusCode.Ok) {
            openDialog('success', 'Posições alteradas com sucesso');
        }
    } catch (e) {
        const error = e.response;
        if (error) {
            openDialog('error', error.data.error);
        } else openDialog('error', 'Algo deu errado, tente novamente mais tarde');
    } finally {
        isUsersLoading.value = false;
    }
}




const confirmBtnClick = () => {
    changeUsersPositionL();
}

const openDialog = (status, text) => {
    dialogOpened.value = true;
    dialogStatus.value = status;
    dialogText.value = text;
}








onMounted(() => {
    loadChoosePeriod();
    loadUsersByPosition();
});

</script>








<template>

    <main class="content">

        <div class="header">

            <p class="title-txt">Página do Admin</p>


            <div v-if="!isChoosePeriodLoading" class="choose-period-box">

                <p :class="choosePeriod ? 'active' : 'inactive'">
                    {{ choosePeriod ? 'Período de escolha ativo' : 'Período de escolha inativo' }}
                </p>

                <button @click="changeChoosePeriodL()" class="btn choose-period-btn" :class="choosePeriod ? 'inactive-btn' : 'active-btn'">
                    {{ choosePeriod ? 'Desativar' : 'Ativar' }}
                </button>

            </div>
            <Loading v-else />

        </div>


        <hr class="division-line" />


        <div class="users-info">

            <draggableComponent 
            v-model="usersList" 
            tag="ul" 
            class="list-group" 
            itemKey="data">
              <template #item="{ element }">
                <li class="list-group-item">
                    <div class="item-section">
                        <p class="item-section-text">{{ element.name }}</p>
                    </div>
                    <div class="item-section">
                        <p class="item-section-text">{{ element.email }}</p>
                    </div>
                    <div :class="element.vacation ? 'active' : 'inactive'" class="item-section">
                        <p class="item-section-text">{{ element.vacation ? 'Férias selecionadas' : 'Férias não selecionadas' }}</p>
                    </div>
                </li>
              </template>
            </draggableComponent>


            <button v-if="!isUsersLoading" @click="confirmBtnClick()" class="btn confirm-btn">Modificar</button>
            <Loading  v-else/>

        </div>

    </main>




    <Dialog 
    :is-open="dialogOpened"
    :status="dialogStatus"
    :text="dialogText"
    @close="dialogOpened = false"
    />

</template>








<style scoped>

.header {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.title-txt {
    font-size: x-large;
    font-weight: 600;
}




.choose-period-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.active {
    color: rgba(52, 189, 10, 0.925);
}

.inactive {
    color: rgba(238, 16, 16, 0.925);
}

.choose-period-btn {
    height: 25px;
    width: 100px;
}




.users-info {
    width: 100%;

    padding: 25px;

    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 15px;
}

.list-group {
    width: 100%;

    padding: 0;

    display: flex;
    flex-direction: column;
    gap: 5px;
}

.list-group-item {
    width: 100%;

    padding: 5px 0;

    display: grid;
    grid-template-columns: 42.5% 42.5% auto;

    border: 1px solid black;
    border-radius: 5px;
    
    cursor: grab;
}

.item-section {
    padding: 5px;
}

.confirm-btn {
    background-color: rgba(52, 189, 10, 0.925);
}

.confirm-btn:hover {
    background-color: rgba(44, 160, 9, 0.925);
}

</style>