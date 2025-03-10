<script setup>
import { onMounted } from 'vue';


const props = defineProps({
    index: Number,
    _id: String,
    vacationPeriods: Array,
    user: Object,
    hasVacation: Boolean
});








const isVacationFromLoggedUser = () => {
    return props.index == 0 && props.hasVacation;
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
}


onMounted(() => {
})

</script>








<template>

    <div class="content">

        <div :class="isVacationFromLoggedUser() ? 'orange-header' : 'gray-header'" class="header">
            <p class="name-txt">{{ user.name }} <span v-if="isVacationFromLoggedUser()">(Você)</span></p>
            <p class="email-txt">{{ user.email }}</p>
        </div>
    
        <div class="periods">
    
            <div class="period">
                <p class="period-txt">1º Período</p>
    
                <div>
                    <p class="from-to-txt">De: {{ formatDate(vacationPeriods[0].startDate) }}</p>
                    <p class="from-to-txt">Até: {{ formatDate(vacationPeriods[0].endDate) }}</p>
                </div>
            </div>
    
            <div class="period">
                <p class="period-txt">2º Período</p>
    
                <div>
                    <p class="from-to-txt">De: {{ formatDate(vacationPeriods[1].startDate) }}</p>
                    <p class="from-to-txt">Até: {{ formatDate(vacationPeriods[1].endDate) }}</p>
                </div>
            </div>
    
        </div>

    </div>

</template>








<style scoped>

.content {
    width: 350px;

    display: flex;
    flex-direction: column;
    gap: 0;
}








.header {
    height: 65px;
    width: 100%;

    padding-left: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border-radius: 5px 5px 0 0;
}

.gray-header {
    background-color: rgba(182, 176, 175, 0.925);
}

.orange-header {
    background-color: rgba(236, 79, 51, 0.925);
}

.name-txt {
    font-size: large;
    font-weight: 600;
}








.periods {
    width: 100%;

    padding: 15px 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border-radius: 0 0 5px 5px;

    background-color: rgba(0, 0, 0, 0.150);
}

.period {
    width: fit-content;

    display: flex;
    flex-direction: column;
    gap: 5px;
}

.period-txt {
    font-size: medium;
    font-weight: 600;
}

</style>