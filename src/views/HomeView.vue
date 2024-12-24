<script setup>
import { RouterLink } from 'vue-router';
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.vue";
import Features from "../components/features.vue"; 
</script>

<template>
  <Header />

  <Hero />

  <Features />

  <Footer />
</template>

<style scoped>
/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: center;
  }

  .navbar {
    margin-top: 10px;
  }

  .movie-card {
    width: 150px;
  }

  .movie-gallery h1 {
    font-size: 2rem;
  }
}
</style>