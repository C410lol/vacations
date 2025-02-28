<script setup>

import Dialog from "./Dialog.vue";
import { ref } from "vue";
import { loginUser } from "../services/apiCalls"
import { HttpStatusCode } from "axios";
import { useRouter } from "vue-router";




const router = useRouter();

const name = ref('');
const email = ref('');
const isLoading = ref(false);

const dialogStatus = ref(null);
const isDialog = ref(false);
const dialogTxt = ref(null);




async function tryToLoginUser() { 
  isLoading.value = !isLoading.value;

  try {
    const req = await loginUser({ name: name.value, email: email.value });
    if (req.status == HttpStatusCode.Ok || req.status == HttpStatusCode.Created) {
      const body = req.data;
      localStorage.setItem('user', JSON.stringify({
        id: body._id,
        name: body.name,
        email: body.email
      }));

      router.push('/vacations');
    }
  } catch(e) {
    openDialog('error', e.response.data.error);
  } finally {
    isLoading.value = !isLoading.value;
  }
}




const openDialog = (status, text) => { 
  isDialog.value = true; 
  dialogStatus.value = status;
  dialogTxt.value = text;
}
const closeDialog = () => { isDialog.value = false; }

</script>




<template>
  
  <main class="content">

    <p class="title">Login</p>

    <form class="form">
      <input v-model="name" class="input" placeholder="Nome"/>
      <input v-model="email" class="input" placeholder="Email"/>
    </form>
  
    <div class="btn-box">
      <div v-if="isLoading" class="spinner"/>
      <button @click="tryToLoginUser()" v-else class="btn">Login</button>
    </div>

  </main>



  <Dialog 
  :is-open="isDialog"
  :text="dialogTxt"
  :status="dialogStatus"
  @close="closeDialog()"
  />

</template>




<style scoped>

.content {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
}




.title {
  width: 100%;

  margin: 0;

  text-align: center;
  font-size: 2.5em;
  font-family: "Bebas Neue", serif;
}




.form {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.input {
  height: 35px;
  width: 95%;
  max-width: 350px;

  padding: 0 10px;

  -webkit-box-shadow: 0px 0px 5px 1.25px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 5px 1.25px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 5px 1.25px rgba(0,0,0,0.25);

  border: 0;
  border-radius: 2.5px;
}

.input:focus {
  outline: none;
}




.btn-box {
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  height: 35px;
  width: 95%;
  max-width: 350px;

  background-color: rgba(238, 50, 16, 0.925);

  border: 0;
  border-radius: 2.5px;

  font-size: .75em;
  font-weight: 600;
  color: white;
}

.btn:hover {
  cursor: pointer;
  background-color: rgba(209, 44, 14, 0.925);
}




.spinner {
    width: 25px;
    height: 25px;
    border: 5px solid #f3f3f3; /* Light gray */
    border-top: 5px solid #3498db; /* Blue */
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>