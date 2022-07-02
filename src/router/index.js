import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatsPerMatch from "@/views/StatsPerMatch";
import ValorantArticles from "@/views/ValorantArticles";
import MatchPlayerStats from "@/views/MatchPlayerStats";
import About from "@/views/About";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "Valorant Tracker",
      icon:""
    }
  },
  {
    path: '/match',
    name: 'matchStats',
    component: StatsPerMatch,
    meta: {
      title: "Login",
      icon:"/lock.png"
    }
  },
  {
    path: '/articles',
    name: 'articles',
    component: ValorantArticles,
    meta: {
      title: "Login",
      icon:"/lock.png"
    }
  },
  {
    path: '/player',
    name: 'player',
    component: MatchPlayerStats,
    meta: {
      title: "Login",
      icon:"/lock.png"
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: "Login",
      icon:"/lock.png"
    }

  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
