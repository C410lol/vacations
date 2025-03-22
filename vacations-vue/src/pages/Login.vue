<script setup>

import Loading from "../components/Loading.vue";
import Dialog from "../components/Dialog.vue";
import { ref } from "vue";
import { loginUser } from "../services/apiCalls"
import { HttpStatusCode } from "axios";




const name = ref('');
const email = ref('');

const isLogin = ref(false);
const isLoading = ref(false);

const dialogStatus = ref(null);
const isDialog = ref(false);
const dialogTxt = ref(null);




async function tryToLoginUser() { 
  isLoading.value = !isLoading.value;
  try {
    const req = await loginUser({ name: name.value, email: email.value });
    if (req.status == HttpStatusCode.Ok || req.status == HttpStatusCode.Created) {
      
      openDialog('success', req.data);
    }
  } catch(e) {
    openDialog('error', e.response.data.error);
  } finally {
    isLoading.value = !isLoading.value;
  }
}




const loginBtnClick = () => {
  if (!isLogin.value && (!name.value || name.value.length < 1)) {
    openDialog('error', "Preencha o campo 'Nome'!");
    return;
  }

  if (!email.value || email.value.length < 1) {
    openDialog('error', "Preencha o campo 'Email'!");
    return;
  }

  tryToLoginUser();
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

    <p class="title">{{ isLogin ? 'Login' : 'Criar' }}</p>

    <form class="form">
      <input v-if="!isLogin" v-model="name" class="input" placeholder="Nome"/>
      <input v-model="email" class="input" placeholder="Email"/>
    </form>

    <div class="is-login-box">
        <input v-model="isLogin" type="checkbox"/>
        <p>Já possuo uma conta</p>
    </div>
  
    <div class="btn-box">
      <Loading v-if="isLoading" />
      <button @click="loginBtnClick()" v-else class="btn">{{ isLogin ? 'Login' : 'Criar' }}</button>
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
  width: 100%;
  height: 100%;

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

.is-login-box {
  display: flex;
  flex-direction: row;
  gap: 10px;
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
}

</style>