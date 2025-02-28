<script setup>
import { onMounted, onUpdated } from 'vue';


const props = defineProps({
    isOpen: Boolean,
    status: String,
    text: String
});

const emits = defineEmits(['close']);




const closeDialog = () => { emits('close'); }




onUpdated(() => {
    if (props.isOpen) {
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
                    </div>

                </div>

            </div>
            
        </Transition>

    </Teleport>

</template>




<style scoped>

.fade-enter-active, .fade-leave-active {
  transform: scale(1);
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}

.fade-leave-to {
    transform: scale(1);
}




.dialog-mask {
    position: fixed;
    inset: 0;
    z-index: 999;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: end;
    justify-content: center;
}

.dialog-content {
    position: fixed;

    bottom: 10vh;

    width: 225px;
    height: 60px;

    display: flex;
    flex-direction: row;

    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);

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

    padding-left: 10px;

    display: flex;
    align-items: center;
}

.message {
    font-weight: 500;
    font-size: medium;
}

</style>