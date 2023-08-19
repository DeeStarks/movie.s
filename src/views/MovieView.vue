<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

// add the icons to the library
library.add(faChevronLeft, faChevronRight)

const route = useRoute()
const movie: any = ref({})
const credits: any = ref([])

// onMounted fetches the movie details from the TMDB API
onMounted(async () => {
  // fetch the movie details
  const url = `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&language=en-US`
  const response = await fetch(url, { method: 'GET' })
  const data = await response.json()
  movie.value = data

  // fetch the movie credits
  const creditsUrl = `https://api.themoviedb.org/3/movie/${route.params.id}/credits?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&language=en-US`
  const creditsResponse = await fetch(creditsUrl, { method: 'GET' })
  const creditsData = await creditsResponse.json()
  credits.value = creditsData
})

// scrollLeft is a function that takes a list name and scrolls the list to the left
const scrollLeft = (listName: string) => {
  const list = document.querySelector(`.movie__cast._${listName}`)
  if (list) {
    list.scrollBy({
      left: -500,
      behavior: 'smooth'
    })
  }
}

// scrollRight is a function that takes a list name and scrolls the list to the right
const scrollRight = (listName: string) => {
  const list = document.querySelector(`.movie__cast._${listName}`)
  if (list) {
    list.scrollBy({
      left: 500,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <main>
    <div class="movie">
      <div class="movie__top">
        <div class="movie__poster">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
        </div>
        <div class="movie__details">
          <h1>{{ movie.title }}</h1>
          <p class="movie__genres">
            <span v-for="(genre, index) in movie.genres" :key="index">{{ genre.name }}</span>
          </p>
          <p class="movie__overview">{{ movie.overview }}</p>
          <p class="movie__homepage" v-if="movie.homepage">
            <a :href="movie.homepage" target="_blank" rel="noopener noreferrer">Visit homepage</a>
          </p>
          <table>
            <tr class="movie__release-date">
              <td class="movie__label">Release Date</td>
              <td class="movie__value">{{ movie.release_date }}</td>
            </tr>
            <tr class="movie__runtime">
              <td class="movie__label">Runtime</td>
              <td class="movie__value">{{ movie.runtime }} minutes</td>
            </tr>
            <tr class="movie__rating">
              <td class="movie__label">Rating</td>
              <td class="movie__value">{{ movie.vote_average }} / 10</td>
            </tr>
            <tr class="movie__vote-count">
              <td class="movie__label">Vote Count</td>
              <td class="movie__value">{{ movie.vote_count }}</td>
            </tr>
            <tr class="movie__status">
              <td class="movie__label">Status</td>
              <td class="movie__value">{{ movie.status }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="line-through" />
      <div class="movie__credits">
        <h2>Cast</h2>
        <div class="no-results" v-if="!credits.cast?.length">No results</div>
        <div class="movie__cast _cast">
          <div class="movie__cast__list">
            <div
              class="movie__cast-member"
              v-for="(castMember, index) in credits.cast"
              :key="index"
              :title="castMember.character"
            >
              <img
                :src="
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
                    : '/images/placeholder.svg'
                "
                :alt="castMember.name"
              />
              <div class="movie__cast-member__labels">
                <p class="movie__cast-member-name">{{ castMember.name }}</p>
                <p class="movie__cast-member-character">{{ castMember.character }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="controls" v-if="credits.cast?.length">
          <button class="prev" @click="scrollLeft('cast')">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
          </button>
          <button class="next" @click="scrollRight('cast')">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </button>
        </div>

        <div class="line-through" />

        <h2>Crew</h2>
        <div class="no-results" v-if="!credits.crew?.length">No results</div>
        <div class="movie__cast _crew">
          <div class="movie__cast__list">
            <div
              class="movie__cast-member"
              v-for="(crewMember, index) in credits.crew"
              :key="index"
              :title="crewMember.job"
            >
              <img
                :src="
                  crewMember.profile_path
                    ? `https://image.tmdb.org/t/p/w200${crewMember.profile_path}`
                    : '/images/placeholder.svg'
                "
                :alt="crewMember.name"
              />
              <div class="movie__cast-member__labels">
                <p class="movie__cast-member-name">{{ crewMember.name }}</p>
                <p class="movie__cast-member-character">{{ crewMember.job }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="controls" v-if="credits.crew?.length">
          <button class="prev" @click="scrollLeft('crew')">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
          </button>
          <button class="next" @click="scrollRight('crew')">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.movie {
  width: 100%;
  max-width: 1550px;
}

.movie__top {
  display: flex;
  gap: 2rem;
}

.movie__poster {
  width: 30%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 30px #0000001a;
}

.movie__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie__details {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.movie__details h1 {
  font-size: 3rem;
  font-weight: 600;
  color: #212121;
}

.movie__genres {
  display: flex;
  gap: 1rem;
}

.movie__genres span {
  font-size: 1rem;
  font-weight: 500;
  color: #212121;
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.movie__overview {
  font-size: 1.2rem;
  color: #212121;
}

.movie__homepage a {
  color: #212121;
  text-decoration: none;
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
}

.movie__homepage a:hover {
  background-color: #e0e0e0;
}

.movie__homepage a:active {
  background-color: #bdbdbd;
}

.movie__details table {
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
}

.movie__details table tr {
  border-bottom: 1px solid #e0e0e0;
}

.movie__details table tr:last-child {
  border-bottom: none;
}

.movie__label {
  font-size: 1.2rem;
  font-weight: 500;
  color: #212121;
}

.movie__value {
  font-size: 1.2rem;
  font-weight: 500;
  color: #212121;
}

@media (max-width: 995px) {
  .movie__top {
    flex-direction: column;
    gap: 1rem;
  }

  .movie__poster {
    width: 100%;
  }

  .movie__details {
    width: 100%;
  }
}

.movie__credits {
  margin-top: 2rem;
}

.movie__credits h2 {
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem;
  color: #212121;
  margin-bottom: 1rem;
}

.movie__cast {
  display: flex;
  overflow-x: hidden;
  gap: 1rem;
  position: relative;
}

.movie__cast__list {
  display: flex;
  gap: 1rem;
}

.movie__cast-member {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.movie__cast-member img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.movie__cast-member__labels {
  width: 100%;
}

.movie__cast-member-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: #212121;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.movie__cast-member-character {
  font-size: 1rem;
  font-weight: 500;
  color: #7a7a7a;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (max-width: 995px) {
  .movie__cast-member {
    width: calc(100vw - 60px);
  }
}

.controls {
  display: flex;
  width: 100%;
  gap: 1rem;
  margin: 1rem;
  justify-content: center;
}

.controls button {
  background-color: #ffffff98;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 30px #0000001a;
  cursor: pointer;
}

.controls button:hover {
  background-color: #f5f5f5;
}

.controls button:first-child {
  left: 0;
}

.controls button:last-child {
  right: 0;
}
</style>
