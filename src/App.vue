<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

const onSearch = (e: Event) => {
  const input = e.target as HTMLInputElement
  const query = input.value.trim()
  var name = router.currentRoute.value.name as string
  if (!name.endsWith('list')) {
    name = 'movie-list'
  }

  if (query.length > 0) {
    router.push({ name: name, query: { q: query } })
  } else {
    router.push({ name: name })
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink :to="{ name: 'home' }" class="logo">Movie.S</RouterLink>
      <input type="text" placeholder="Type and hit enter to search" @keydown.enter="onSearch" />
      <nav>
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink to="/tv-shows">TV Shows</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  position: fixed;
  background-color: #ffffff;
  z-index: 1;
  width: 100%;
  left: 0;
  top: 0;
  padding: 10px calc(var(--section-gap) / 2);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  width: 100%;
  max-width: 1550px;
  display: flex;
  place-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: bold;
  font-family: Aquire;
  font-size: 3.5rem;
  color: #212121;
  background-color: transparent !important;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: #212121;
  font-weight: 500;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
}

nav a:hover {
  background-color: #f5f5f5;
}

nav a.router-link-exact-active {
  background-color: #f5f5f5;
}

@media (max-width: 995px) {
  header {
    padding: 10px;
  }
  .wrapper {
    flex-direction: column;
    align-items: center;
  }
  .logo {
    font-size: 2.5rem;
  }
}

input {
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  max-width: 20rem;
  font-size: 1rem;
  height: 50px;
  text-align: center;
}
</style>
