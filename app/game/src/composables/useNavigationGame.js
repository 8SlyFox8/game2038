import { useRouter } from 'vue-router'

export function useNavigationGame() {
    const router = useRouter()

    function goToMainMenu() {
        router.push({ name: 'mainMenu' })
    }

    function goToNewGame() {
        router.push({ name: 'game' })
    }

    function goToGame() {
        router.push({ name: 'game' })
    }

    function goToTableRecords() {
        router.push({ name: 'tableRecords' })
    }

    return {
        goToMainMenu,
        goToNewGame,
        goToGame,
        goToTableRecords
    }
}