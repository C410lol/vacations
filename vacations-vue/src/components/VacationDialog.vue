<script setup>
import Loading from './Loading.vue';
import Dialog from './Dialog.vue';
import { onMounted, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getForbiddenDates, postVacation } from '@/services/apiCalls';
import { HttpStatusCode } from 'axios';



// PROPS
const props = defineProps({
    isOpen: Boolean,
    userId: String
});

// EMITS
const emits = defineEmits(['close', 'confirm']);


// FIELDS
const forbiddenDates = ref([]);
const firstSDate = ref([]);
const secondSDate = ref([]);
const isLoading = ref(false);


// DIALOG
const isDOpen = ref(false);
const dStatus = ref();
const dText = ref();

const openDialog = (status, text) => {
    isDOpen.value = true;
    dStatus.value = status;
    dText.value = text;
}








const loadForbiddenDates = async () => {
    isLoading.value = true;
    try {
        const res = await getForbiddenDates();
        if (res.status == HttpStatusCode.Ok) {
            forbiddenDates.value = res.data;
        }
    } catch(e) {
        if (e.response.data.error != null) {
            openDialog('error', e.response.data.error);
        } else openDialog('error', 'Algo deu errado, tente novamente mais tarde');
    } finally {
        isLoading.value = false;
    }
}

const createVacation = async () => {
    isLoading.value = true;
    try {
        const vacation = {
            vacationPeriods: [
                {
                    startDate: firstSDate.value[0].toLocaleDateString('en-US'),
                    endDate: firstSDate.value[1].toLocaleDateString('en-US')
                },
                {
                    startDate: secondSDate.value[0].toLocaleDateString('en-US'),
                    endDate: secondSDate.value[1].toLocaleDateString('en-US')
                }
            ]
        }

        const res = await postVacation(props.userId, vacation);
        if (res.status == HttpStatusCode.Created) {
            openDialog('success', 'Férias selecionada com sucesso');

            emits('confirm');

            firstSDate.value = [];
            secondSDate.value = [];
        }
    } catch(e) {
        if (e.response.data.error != null) {
            openDialog('error', e.response.data.error);
        } else openDialog('error', 'Algo deu errado, tente novamente mais tarde');
    } finally {
        isLoading.value = false;
    }
}








const getFormatedDates = (dateRange) => {
    if (dateRange.length < 1) return '';
    return [dateRange[0].toLocaleDateString('pt-BR'), dateRange[1].toLocaleDateString('pt-BR')];
}

const confirmBtnClick = () => {
    if (firstSDate.value.length < 2) {
        openDialog('error', 'Selecione o 1º período');
        return;
    }
    if (secondSDate.value.length < 2) {
        openDialog('error', 'Selecione o 2º período');
        return;
    }

    openDialog('action', 'Confirmar férias? (essa ação não poderá ser alterada)')
}








onMounted(() => {
    loadForbiddenDates();
});

</script>




<template>

    <Teleport to="body">

        <Transition name="fade">

            <div v-if="isOpen" class="dialog-mask">

                <div class="content">

                    <div class="header">

                        <p class="select-txt">Selecionar férias</p>

                        <img @click="emits('close')" class="close-img" src="../assets/icons8-close-24 (1).png" />

                    </div>


                    <hr class="division-line"/>


                    <div class="vacations-select">

                        <div class="period">
                            <p class="period-txt">1º Período</p>

                            <div class="from-to-box">
                                <p class="from-to-txt">De: {{ getFormatedDates(firstSDate)[0] }}</p>
                                <p class="from-to-txt">Até: {{ getFormatedDates(firstSDate)[1] }}</p>
                            </div>

                            <VueDatePicker 
                            v-model="firstSDate"
                            :range="{ minRange: 14, maxRange: 14 }" :disabled-dates="forbiddenDates" :loading="isLoading"
                            multi-calendars hide-offset-dates inline auto-apply :enable-time-picker="false">

                                <template #action-extra>
                                    <p @click="firstSDate = []" class="clear-txt">Limpar</p>
                                </template>

                            </VueDatePicker>
                        </div>


                        <div class="period">
                            <p class="period-txt">2º Período</p>

                            <div class="from-to-box">
                                <p class="from-to-txt">De: {{ getFormatedDates(secondSDate)[0] }}</p>
                                <p class="from-to-txt">Até: {{ getFormatedDates(secondSDate)[1] }}</p>
                            </div>

                            <VueDatePicker 
                            v-model="secondSDate" 
                            :range="{ minRange: 14, maxRange: 14 }" :disabled-dates="forbiddenDates" :loading="isLoading"
                            multi-calendars hide-offset-dates inline auto-apply :enable-time-picker="false">

                                <template #action-extra>
                                    <p @click="secondSDate = []" class="clear-txt">Limpar</p>
                                </template>

                            </VueDatePicker>

                        </div>

                    </div>


                    <div class="btn-box">
                        <Loading v-if="isLoading" />
                        <button v-else @click="confirmBtnClick" class="btn">Confirmar</button>
                    </div>

                </div>

            </div>

        </Transition>

    </Teleport>




    <Dialog
    :is-open="isDOpen"
    :status="dStatus"
    :text="dText"
    @close="isDOpen = false"
    @confirm="createVacation"
    />

</template>




<style scoped>

.dialog-mask {
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.473);
}




.content {
    height: fit-content;
    width: 100%;    
    max-width: 1250px;    

    padding: 25px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    border-radius: 5px;

    background-color: white;
}




.header {
    height: 40px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.select-txt {
    font-size: x-large;
    font-weight: 600;
}

.close-img {
    width: 30px;
    height: 30px;

    cursor: pointer;
}




.vacations-select {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.period {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.period-txt {
    font-size: larger;
    font-weight: 600;
}

.clear-txt {
    cursor: pointer;
}




.btn-box {
    height: 35px;
    width: 100%;

    display: flex;
    align-items: end;
    justify-content: end;
}

.btn {
    height: 100%;
    width: 175px;
}

</style>