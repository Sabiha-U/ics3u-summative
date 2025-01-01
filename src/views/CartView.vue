<script setup>
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const removeFromCart = (movieId) => {
    store.cart.delete(movieId);
}
</script>

<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <div v-for="([key, movie]) in store.cart" :key="key" class="cart-item">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.url}`" alt="Movie Poster" />
      <h2>{{ movie.title }}</h2>
      <button @click="removeFromCart(key)">Remove</button>
    </div>
  </div>
</template>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #141414;
  min-height: 100vh;
  color: white;
}

.cart h1 {
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #222;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
}

.cart-item img {
  width: 10%;
  border-radius: 5%;
}

.cart-item h2 {
  flex: 1;
  font-size: 1.5rem;
  color: #FFD700;
}

.cart-item button {
  padding: 10px 15px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cart-item button:hover {
  background-color: #ff1e2d;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item img {
    width: 20%;
  }

  .cart-item h2 {
    margin: 10px 0;
    text-align: center;
  }
}
</style>