<script setup>
import Loading from '@/components/Loading.vue';
import Vacation from '@/components/Vacation.vue';
import { getAllVacations, getUserVacations } from '@/services/apiCalls';
import { all, HttpStatusCode } from 'axios';
import { onMounted, reactive, ref } from 'vue';
import VacationDialog from '../components/VacationDialog.vue';




var user = reactive({
    _id: '',
    name: ''
});

var userVacation = reactive({
    _id: '',
    selectedDate: '',
    user: null,
    vacationPeriods: [],
});
const hasVacation = ref(false);
const allVacations = ref([]);


const isLoading = ref(true);


// DIALOG VARIABLES //
const isDialogOpen = ref(false);




const loadUser = () => {
    const userLS = localStorage.getItem('user');
    if (userLS == null) return;

    const userLc = JSON.parse(userLS);
    const id = userLc._id;
    const name = userLc.name;
    if (id == null || name == null) return;

    user._id = id;
    user.name = name;

    loadUserVacation();
}

const loadUserVacation = async () => {
    isLoading.value = true;
    try {
         const res = await getUserVacations(user._id);
         if (res.status == HttpStatusCode.Ok) {
            const body = res.data;
            
            if (body.hasVacation) {
                hasVacation.value = true;
                userVacation = body.vacation;
            }

            loadAllVacations();
         }
    } catch(e) {

    } finally {
        isLoading.value = false;
    }
}

const loadAllVacations = async () => {
    isLoading.value = true;
    try {
        const res = await getAllVacations(user._id);
        if (res.status == HttpStatusCode.Ok) {
            allVacations.value = res.data.vacations;

            if (hasVacation.value) allVacations.value.unshift(userVacation);
        }
    } catch(e) {

    } finally {
        isLoading.value = false;
    }
}








const refreshElements = () => {
    loadUserVacation();
    isDialogOpen.value = false;
}








onMounted(() => {
    loadUser();
});

</script>








<template>

    <main class="content">

        <div class="user-info">
            <p class="user-txt">Olá, {{ user.name }}</p>

            <div v-if="hasVacation" class="vacation-status choosed">
                <p class="vacation-txt">Férias escolhidas</p>
            </div>

            <button v-else @click="isDialogOpen = true" class="btn">Escolher férias</button>
        </div>


        <hr class="division-line" />


        <div class="vacations-info">

            <ul v-if="allVacations.length > 0" class="vacations-list">

                <Vacation v-for="(vacation, index) in allVacations" :key="index"
                :index="index"
                :_id="vacation._id"
                :vacation-periods="vacation.vacationPeriods"
                :user="vacation.user"
                :has-vacation="hasVacation"
                />

            </ul>

            <Loading v-else />

        </div>

    </main>




    <VacationDialog
    :is-open="isDialogOpen"
    :user-id="user._id"
    @close="isDialogOpen = false"
    @confirm="refreshElements"
    />

</template>




<style>

.division-line {
    max-width: 1500px;
}




.content {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}




.user-info {
    height: 40px;
    width: 100%;
    max-width: 1500px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.user-txt {
    font-size: x-large;
    font-weight: 600;
}




.vacation-status {
    height: 30px;
    width: 150px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
}

.choosed {
    background-color: #48df55;
}

.vacation-txt {
    color: white;
}

.btn {
    height: 30px;
    width: 200px;
}








.vacations-info {
    width: 100%;
    max-width: 1500px;

    padding-top: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.vacations-list {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
}

</style>