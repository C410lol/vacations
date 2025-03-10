<script setup>
import { onMounted, onUpdated } from 'vue';


const props = defineProps({
    isOpen: Boolean,
    status: String,
    text: String
});

const emits = defineEmits(['close', 'confirm']);




const closeDialog = () => { emits('close'); }
const confirmDialog = () => { emits('confirm'); }




onUpdated(() => {
    if (props.isOpen && props.status != 'action') {
        setTimeout(() => {
            closeDialog();
        }, 3000);
    }
});

</script>




<template>

    <Teleport to="body">

        <Transition name="fade">

            <div @click="closeDialog()" v-if="isOpen" class="dialog-mask">

                <div class="dialog-content">

                    <div class="img-box">
                        <img v-if="status == 'success'" class="img" src="../assets/correct.png" />
                        <img v-else-if="status == 'error'" class="img" src="../assets/wrong.png" />
                        <img v-else class="img" src="../assets/attention.png" />
                    </div>

                    <div class="text-box">
                        <p class="message">{{ text }}</p>

                        <div v-if="status == 'action'" class="btn-box">
                            <img @click="closeDialog()" class="img-btn" src="../assets/close.png"/>
                            <img @click="confirmDialog" class="img-btn" src="../assets/check.png"/>
                        </div>
                    </div>

                </div>

            </div>
            
        </Transition>

    </Teleport>

</template>




<style scoped>

.dialog-mask {
    align-items: end;
    justify-content: center;    

    z-index: 1000;
}




.dialog-content {
    position: fixed;

    bottom: 10vh;

    width: 300px;
    height: 75px;

    display: flex;
    flex-direction: row;

    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);

    background-color: white;

    border-radius: 5px;
}




.img-box {
    height: 100%;
}

.img {
    height: 100%;
}




.text-box {
    width: 100%;
    height: 100%;

    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.message {
    max-width: 100%;

    font-weight: 500;
    font-size: medium;
}




.btn-box {
    width: 100%;
    height: 25px;

    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 10px;
}

.img-btn {
    height: 100%;

    padding: 5px;

    border-radius: 5px;

    cursor: pointer;
}

.img-btn:hover {
    background-color: rgba(0, 0, 0, 0.150);
}

</style>