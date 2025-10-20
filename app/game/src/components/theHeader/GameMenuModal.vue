<script setup>
import '@/assets/styles/modal.css'
import { useNavigationGame } from '@/composables/useNavigationGame.js'
import { useGameSaveStore } from '@/stores/gameSave'

const gameSaveStore = useGameSaveStore()
const { goToMainMenu, goToNewGame, goToGame, goToTableRecords } = useNavigationGame()

const isOpenGameMenuModal = defineModel('isOpenGameMenuModal')

function closeGameMenuModal() {
    isOpenGameMenuModal.value = false
}

function navigateAndCloseGameMenuModal(targetNavigation) {
    closeGameMenuModal()
    switch (targetNavigation) {
        case 'ContinueGame':
            goToNewGame()
            break
        case 'NewGame':
            gameSaveStore.startNewGame()
            goToGame()
            break
        case 'TableRecords':
            goToTableRecords()
            break
        case 'MainMenu':
            goToMainMenu()
            break
    }
}
</script>

<template>
    <div
        v-show="isOpenGameMenuModal"
        class="game-menu-modal-overlay"
    >
        <div class="game-menu-modal">
            <div class="game-menu-modal_header">
                <p>Меню</p>
                <p
                    @click="closeGameMenuModal"
                >
                    X
                </p>
            </div>
            <hr class="game-menu-modal_hr"/>
            <div class="game-menu-modal_menu-navigation">
                <button
                    v-show="gameSaveStore.isGameStarted"
                    @click="navigateAndCloseGameMenuModal('ContinueGame')"    
                >
                    Продолжить
                </button>
                <button
                    @click="navigateAndCloseGameMenuModal('NewGame')"  
                >
                    Новая игра
                </button>
                <button
                    @click="navigateAndCloseGameMenuModal('TableRecords')"  
                >
                    Таблица рекордов
                </button>
                <button
                    @click="navigateAndCloseGameMenuModal('MainMenu')"
                >
                    Главное меню
                </button>
            </div>
        </div>
    </div>
</template>