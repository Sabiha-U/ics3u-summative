<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const response = ref(null);

onMounted(async () => {
  response.value = await axios.get(
    `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`
  );
});
</script>

<template>
  <div v-if="response" class="movie-detail">
    <h1 class="movie-title">{{ response.data.title }}</h1>
    <p class="movie-overview">{{ response.data.overview }}</p>
    <p class="movie-release-date">Release Date: {{ response.data.release_date }}</p>
    <p class="movie-popularity">Popularity: {{ response.data.popularity }}</p>
    <p class="movie-genres">
      Genres:
      <span v-for="genre in response.data.genres" :key="genre.id">{{ genre.name }}</span>
    </p>
    <p class="movie-languages">
      Languages:
      <span v-for="language in response.data.spoken_languages" :key="language.iso_639_1">{{ language.name }}</span>
    </p>
    <p class="movie-production-companies">
      Production Companies:
      <span v-for="company in response.data.production_companies" :key="company.id">{{ company.name }}</span>
    </p>
    <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster" class="movie-poster" />
  </div>
</template>

<style scoped>
.movie-detail {
  padding: 20px;
  color: white;
  background-color: #141414;
  min-height: 100vh;
}

.movie-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #ffd700;
}

.movie-overview {
  font-size: 1.2rem;
  margin-bottom: 10px;
  line-height: 1.6;
}

.movie-release-date,
.movie-popularity,
.movie-genres,
.movie-languages,
.movie-production-companies {
  font-size: 1rem;
  margin-bottom: 10px;
}

.movie-genres span,
.movie-languages span,
.movie-production-companies span {
  display: inline-block;
  margin-right: 10px;
  color: #ffd700;
}

.movie-poster {
  width: 23%;
  border-radius: 10px;
  margin-top: 20px;
}

.buy-button {
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #d4af37;
  color: black;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy-button:hover {
  background-color: #ffd700;
  transform: translateY(-2px);
}

.added-button {
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.added-button:hover {
  background-color: #ff1e2d;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .movie-poster {
    width: 70%;
  }
}

@media (max-width: 480px) {
  .movie-detail {
    padding: 10px;
  }

  .movie-title {
    font-size: 2rem;
  }

  .movie-poster {
    width: 100%;
  }
}
</style>