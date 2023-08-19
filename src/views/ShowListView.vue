<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch, ref } from 'vue'
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'

const route = useRoute()
const router = useRouter()
const genres: any = ref([])
const shows: any = ref([])
const totalPages: any = ref(0)
const currentPage: any = ref(1)

// fetchShows is an async function that takes a query string and fetches movies from the TMDB API
const fetchShows = async (query: string = '', page: number = 1, genre: string = '') => {
  // if the genres array is empty, fetch the genres from the API
  if (genres.value.length === 0) {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US`
    const response = await fetch(url, { method: 'GET' })
    const data = await response.json()
    genres.value = data.genres
  }

  // proceed to fetch tv shows
  // - if the user has entered a query, use the search endpoint
  var url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&page=${page}&language=en-US`
  if (query.length > 0) {
    url = `https://api.themoviedb.org/3/search/tv?query=${query}&page=${page}&include_adult=false&language=en-US`
  }

  // append the API key to the URL
  url += `&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  // add the genre to the URL if it's available
  if (genre.length > 0) {
    url += `&with_genres=${genre}`
  }

  const response = await fetch(url, { method: 'GET' })
  const data = await response.json()
  shows.value = data.results
  totalPages.value = data.total_pages
  return
}

// getGenreName is a function that takes a genre ID and returns the genre name
const getGenreName = (id: number) => {
  const genre: any = genres.value.find((genre: any) => genre.id === id)
  return genre?.name
}

// setPage is a function that takes a page number and updates the route's query string
const setPage = (page: number) => {
  router.push({
    name: '',
    query: {
      ...route.query,
      page: page
    }
  })
  currentPage.value = page

  // fetch shows with the new page number
  fetchShows(route.query.q as string, page, route.query.genre as string)
}

// watch listens for changes to the route's query string and calls fetchShows with the new query
watch(route, async (newRoute) => {
  currentPage.value = parseInt(newRoute.query.page as string) || 1
  fetchShows(newRoute.query.q as string, currentPage.value, newRoute.query.genre as string)
})

// onMounted calls fetchShows with the initial query string
onMounted(async () => {
  currentPage.value = parseInt(route.query.page as string) || 1
  fetchShows(route.query.q as string, currentPage.value, route.query.genre as string)
})
</script>

<template>
  <main>
    <div class="genres">
      <RouterLink
        :to="{ name: 'tv-show-list', query: { ...route.query, genre: '' } }"
        class="genre"
        :class="{ active: route.query.genre === '' }"
        >All</RouterLink
      >
      <RouterLink
        :to="{ name: 'tv-show-list', query: { ...route.query, genre: genre.id } }"
        class="genre"
        v-for="genre in genres"
        :key="genre.id"
        :class="{ active: route.query.genre === genre.id.toString() }"
        >{{ genre.name }}</RouterLink
      >
    </div>
    <div class="movies">
      <div class="no-results" v-if="shows.length === 0">No results</div>
      <RouterLink
        class="movie"
        v-for="show in shows"
        :key="show.id"
        :to="{ name: 'tv-show', params: { id: show.id } }"
      >
        <img
          :src="
            show.poster_path
              ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
              : '/images/placeholder.svg'
          "
          :alt="show.title"
        />
        <div class="movie-info">
          <h3>{{ show.title }}</h3>
          <div class="tags">
            <span class="tag" v-for="genre in show.genre_ids" :key="genre">{{
              getGenreName(genre)
            }}</span>
          </div>
        </div>
        <br />
        <small>Released: {{ show.release_date }}</small>
        <small>Rating: {{ show.vote_average }}/10 | {{ show.vote_count }} votes</small>
      </RouterLink>
    </div>
    <br />
    <br />
    <v-pagination
      v-model="currentPage"
      :pages="totalPages"
      active-color="#000000ae"
      @update:model-value="setPage"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.genres {
  gap: 1rem;
  margin-top: 1rem;
  max-width: 1550px;
}

.genre {
  display: inline-block;
  color: #ffffff;
  background-color: #000000ae;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  margin: 0.25rem;
  font-size: 0.8rem;
  text-decoration: none;
}

.genre.active {
  background-color: #000000;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  width: 100%;
  max-width: 1550px;
}

.movie {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.movie:hover {
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.movie img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.movie-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.movie-info h3 {
  text-align: center;
  font-weight: 500;
  font-size: 1.2rem;
  color: #212121;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  color: #ffffff;
  background-color: #000000ae;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  margin: 0.25rem;
  font-size: 0.8rem;
}

small {
  color: #757575;
  font-size: 0.8rem;
  text-align: center;
}
</style>
