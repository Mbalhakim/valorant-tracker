import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatsPerMatch from "@/views/StatsPerMatch";
import ValorantArticles from "@/views/ValorantArticles";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/match',
    name: 'matchStats',
    component: StatsPerMatch
  },
  {
    path: '/articles',
    name: 'articles',
    component: ValorantArticles
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
