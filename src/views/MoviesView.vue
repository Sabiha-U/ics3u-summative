<script setup>
import Header from "../components/Header.vue";
import Genres from "../components/Genres.vue";
import Footer from "../components/Footer.vue";
import { auth } from '../firebase';

const genresList = [
  {
    id: 28,
    genreName: "Action"
  },
  {
    id: 12,
    genreName: "Adventure"
  },
  {
    id: 27,
    genreName: "Horror"
  },
  {
    id: 10751,
    genreName: "Family"
  },
  {
    id: 35,
    genreName: "Comedy"
  },
]
</script>

<template>
  <Header />
  <Genres :genres="genresList" />
  <Footer />
</template>

<style scoped></style>