<script setup>

const props = defineProps({
    isOpen: Boolean,
    status: String,
    text: String
});

const emits = defineEmits(['close']);




const closeDialog = () => { emits('close'); }

</script>




<template>

    <Teleport to="body">

        <Transition name="fade">

            <div @click="closeDialog()" v-if="isOpen" class="dialog-mask">

                <div class="dialog-content">

                    <p>{{ text }}</p>

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
    width: 200px;
    height: 20px;
    background-color: aqua;
}

</style>