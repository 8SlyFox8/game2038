<script setup>
import '@/assets/styles/modal.css'
import { ref } from 'vue'
import { useNavigationGame } from '@/composables/useNavigationGame.js'
import { useGameSaveStore } from '@/stores/gameSave'
import { useRecordsStore } from '@/stores/records'

const recordsStore = useRecordsStore()
const gameSaveStore = useGameSaveStore()
const { goToMainMenu, goToGame, goToTableRecords } = useNavigationGame()

const isOpenGameRecordsModal = defineModel('isOpenGameRecordsModal')
const isWinGame = defineModel('isWinGame')

const playerName = ref('')

function closeGameRecordsModal() {
    isOpenGameRecordsModal.value = false
}

function navigateAndCloseGameRecordsModal(targetNavigation) {
    const nameToUse = playerName.value.trim() !== '' ? playerName.value : 'P1'

    recordsStore.addRecord(nameToUse, gameSaveStore.score)
    closeGameRecordsModal()
    switch (targetNavigation) {
        case 'NewGame':
            gameSaveStore.startNewGame()
            goToGame()
            break
        case 'TableRecords':
            gameSaveStore.resetGame()
            goToTableRecords()
            break
        case 'MainMenu':
            gameSaveStore.resetGame()
            goToMainMenu()
            break
    }
}
</script>

<template>
    <div
        v-show="isOpenGameRecordsModal"
        class="game-menu-modal-overlay"
    >
        <div class="game-menu-modal">
            <div class="game-menu-modal_header">
                <p v-if="isWinGame">Поздравляем!</p>
                <p v-else>Вы мертвы...</p>
            </div>
            <hr class="game-menu-modal_hr"/>
            <div class="game-menu-modal_menu-navigation">
                <p>
                    Вы набрали: {{ gameSaveStore.score }}
                </p>
                <input
                    v-model="playerName"
                    placeholder="Ваше имя"
                />
                <button
                    @click="navigateAndCloseGameRecordsModal('NewGame')"  
                >
                    Новая игра
                </button>
                <button
                    @click="navigateAndCloseGameRecordsModal('TableRecords')"  
                >
                    Таблица рекордов
                </button>
                <button
                    @click="navigateAndCloseGameRecordsModal('MainMenu')"
                >
                    Главное меню
                </button>
            </div>
        </div>
    </div>
</template>