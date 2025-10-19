<script setup>
import { useNavigationGame } from '@/composables/useNavigationGame.js'

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

<style scoped>
.game-menu-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.game-menu-modal {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 50vw;
    height: 50vh;
    background-color: black;
    padding: 20px 20px;
    border: 2px solid white;
}

.game-menu-modal_header {
    display: flex;
    justify-content: space-between;
}

.game-menu-modal_hr {
    position: relative;
    left: -20px;
    width: calc(50vw + 40px);
}

.game-menu-modal_menu-navigation {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>