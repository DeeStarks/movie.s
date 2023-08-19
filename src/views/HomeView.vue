<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onSearch = (e: Event) => {
  const q = (e.target as HTMLInputElement).value.trim()
  if (q.length > 0) {
    router.push({ name: 'movie-list', query: { q: q } })
  } else {
    router.push({ name: 'movie-list' })
  }
}
</script>

<template>
  <div class="home">
    <h1>Looking for a movie or TV show?</h1>
    <p>Search for your favorite movies and TV shows and keep track of what you've watched.</p>
    <br />
    <br />
    <input type="text" placeholder="Type and enter to search" @keydown.enter="onSearch" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
  text-align: center;
}

.home::after {
  content: '';
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/home-bg.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.9;
  z-index: -1;
}

.home h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
}

.home p {
  font-size: 1.5rem;
  font-weight: 500;
  color: #b8b8b8;
}

.home input {
  width: 90%;
  max-width: 600px;
  padding: 1.55rem 2rem;
  border: none;
  border-radius: 2px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #212121;
}
</style>
