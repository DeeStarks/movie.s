import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieListView from '../views/MovieListView.vue'
import MovieView from '../views/MovieView.vue'
import ShowListView from '../views/ShowListView.vue'
import ShowView from '../views/ShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movie-list',
      component: MovieListView
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/tv-shows',
      name: 'tv-show-list',
      component: ShowListView
    },
    {
      path: '/tv-shows/:id',
      name: 'tv-show',
      component: ShowView
    }
  ]
})

export default router
