<script setup>
import '@/assets/styles/modal.css'
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, helpers } from '@vuelidate/validators'
import { useNavigationGame } from '@/composables/useNavigationGame.js'
import { useGameSaveStore } from '@/stores/gameSave'
import { useRecordsStore } from '@/stores/records'

const recordsStore = useRecordsStore()
const gameSaveStore = useGameSaveStore()
const { goToMainMenu, goToGame, goToTableRecords } = useNavigationGame()

const playerName = ref('')

const rules = {
    playerName: {
        maxLength: helpers.withMessage('Слишком длинное имя', maxLength(3)),
        $autoDirty: true 
    }
}

const v$ = useVuelidate(rules, { playerName })

function navigateAndCloseGameRecordsModal(targetNavigation) {
    if (v$.value.$invalid) {
        playerName.value = 'P1'
    }

    const nameToUse = playerName.value.trim() !== '' ? playerName.value : 'P1'
    recordsStore.addRecord(nameToUse, gameSaveStore.score)
    playerName.value = ''

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
        v-show="gameSaveStore.isGameOver"
        class="game-menu-modal-overlay"
    >
        <div class="game-menu-modal">
            <div class="game-menu-modal_header">
                <p v-if="gameSaveStore.isWinGame">Поздравляем!</p>
                <p v-else>Вы мертвы...</p>
            </div>
            <hr class="game-menu-modal_hr"/>
            <div class="game-menu-modal_menu-navigation">
                <p>
                    Вы набрали: {{ gameSaveStore.score }}
                </p>
                <p 
                    v-for="error of v$.playerName.$errors" 
                    :key="error.$uid"
                    class="game-menu_error-message"
                >
                    {{ error.$message }}
                </p>
                <input
                    v-model="playerName"
                    placeholder="Ваше имя"
                    :class="{ error: v$.playerName.$error }"
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

<style scoped>
.game-menu_error-message {
    color: red;
}
</style>