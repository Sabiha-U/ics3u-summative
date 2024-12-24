<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const props = defineProps(["genres"]);
const router = useRouter();
const store = useStore();
const selectedGenre = ref(28);
const response = ref(null);

async function getMovieByGenre() {
  response.value = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`
  );
}

function getMovieDetails(id) {
  router.push(`/movies/${id}`);
}

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
})

const addedInCart = (movie) => {
  store.cart.set(movie.id, {
    title: movie.title,
    url: movie.poster_path,
  });
};
</script>

<template>
  <div class="movie-gallery">
    <h1>CinemaVibe Presents</h1>
    <select v-model="selectedGenre" @change="getMovieByGenre">
      <option v-for="genre of genres" :value="genre.id" :key="genre.id">{{ genre.genreName }}</option>
    </select>
    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card" @click="getMovieDetails(movie.id)">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ movie.title }}</p>
        <button v-if="!store.cart.has(movie.id)" @click.stop="addedInCart(movie)" class="buy-button">
          Buy
        </button>
        <button v-else @click="router.push(`/cart`);" @click.stop="addedInCart(movie)" class="added-button">
          Added (Go To Cart)
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-gallery {
  padding: 20px;
  text-align: center;
  background-color: #141414;
  min-height: 100vh;
}

.movie-gallery h1 {
  font-size: 2.5rem;
  color: #d4af37;
  margin-bottom: 20px;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie-card {
  background-color: #222;
  border-radius: 10px;
  overflow: hidden;
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(212, 175, 55, 0.7);
}

.movie-poster {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.movie-title {
  padding: 10px;
  font-size: 1rem;
  color: #d4af37;
  text-align: center;
}

.buy-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #d4af37;
  color: black;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy-button:hover {
  background-color: #ffd700;
  transform: translateY(-2px);
}

.added-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.added-button:hover {
  background-color: #ff1e2d;
  transform: translateY(-2px);
}

select {
  background-color: #222;
  color: #d4af37;
  padding: 10px;
  border: 2px solid #444;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
  margin: 10px 0;
  cursor: pointer;
}

select:focus {
  border-color: #d4af37;
  outline: none;
  box-shadow: 0 0 5px rgba(212, 175, 55, 0.8);
}
</style>