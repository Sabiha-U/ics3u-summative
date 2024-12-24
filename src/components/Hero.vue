<script setup>
</script>

<template>
  <div class="hero">
    <div class="hero-content">
      <img src="/src/assets/BakcgroundHeroPage.jpg" alt="Hero Movie Page" />
      <h1>Rent the Best Movies Now</h1>
      <p>Catch the latest blockbuster at CinemaVibe</p>
      <button class="cta">Rent Now</button>
    </div>
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/src/assets/BakcgroundHeroPage.jpg') no-repeat center center;
  background-size: cover;
  box-sizing: border-box;
  padding-top: 60px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero img {
  width: 600px;
  height: auto;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.7);
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
}

.hero p {
  font-size: 1.2em;
  margin-bottom: 30px;
  color: white;
  text-align: center;
}

.cta {
  background-color: #D4AF37;
  color: black;
  padding: 15px 35px;
  border-radius: 30px;
  font-size: 1.2em;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta:hover {
  background-color: #FFD700;
  transform: translateY(-5px);
}
</style>