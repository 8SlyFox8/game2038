<script setup>
import MenuIcon from '@/assets/icons/icons8-меню-50.png'
import GameMenuModal from '@/components/theHeader/GameMenuModal.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentView = computed(() => {
    return route.name
})

const isOpenGameMenuModal = ref(false)

function openGameMenuModal() {
    isOpenGameMenuModal.value = true
}
</script>

<template>
    <div class="header">
        <div>
            <p>2048</p>
        </div>
        <div>
            <img
                v-if="currentView !== 'mainMenu'"
                @click="openGameMenuModal"
                :src="MenuIcon"
                alt="Открыть меню"
                class="icon-img"
            >
        </div>
    </div>
    <hr/>
    <GameMenuModal
        v-model:isOpenGameMenuModal="isOpenGameMenuModal"
    />
</template>

<style scoped>
.header {
    width: calc(100vw - 48px);
    height: 32px;
    display: flex;
    justify-content: space-between;
    padding: 4px 24px;
}
</style>