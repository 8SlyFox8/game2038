import { createWebHistory, createRouter } from 'vue-router'

import MainMenuView from '@/views/MainMenuView.vue'
import GameView from '@/views/GameView.vue'
import TableRecordsView from '@/views/TableRecordsView.vue'

const routes = [
    { 
        path: '/',
        name: 'mainMenu',
        component: MainMenuView
    },
    {
        path: '/game',
        name: 'game',
        component: GameView
    },
    {
        path: '/tableRecords',
        name: 'tableRecords',
        component: TableRecordsView
    },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})