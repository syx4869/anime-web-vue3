import { createRouter, createWebHistory } from 'vue-router'
import AnimeGrid from '../components/AnimeGrid.vue'

const routes = [{ path: '/', name: 'Home', component: AnimeGrid }]

export default createRouter({
  history: createWebHistory(),
  routes
})