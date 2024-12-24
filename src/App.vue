<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fef8e4;
  color: #333;
}

header {
  background-color: #ffbf00;
  color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 50px;
}

nav {
  display: flex;
}

nav .btn {
  background-color: #dba700;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  text-decoration: none;
}

nav .btn:hover {
  background-color: #b88f00;
}

footer {
  background-color: #ffbf00;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>