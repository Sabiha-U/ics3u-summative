<script setup>
import { useStore } from "../store";
import { useRouter } from "vue-router";
import {onAuthStateChnaged} from "firebase/auth";
import {auth} from "../firebase";

const store = useStore();
const router = useRouter();

const goToCart = () => {
  router.push("/cart");
};

const goToSettings = () => {
  router.push("/settings");
};

const logout = () => {
  store.logoutUser();
  router.push("/");
};
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img src="/src/assets/Logo.webp" alt="CinemaVibe Logo" class="logo-img" />
      </div>
      <div v-if="store.isLoggedIn" class="user-actions">
        <span class="welcome-msg">Hello, {{ store.firstName }}!</span>
      </div>
      <div class="navbar">
        <div class="search-container">
          <input type="text" placeholder="Search for movies..." class="search-input" />
          <img src="/src/assets/searchIcon.png" alt="Search Icon" class="search-icon" />
        </div>
        <div v-if="!store.isLoggedIn">
          <RouterLink to="/login" class="button login">Login</RouterLink>
          <RouterLink to="/register" class="button register">Register</RouterLink>
        </div>
        <div v-else class="user-actions">
          <div class="settings-icon" @click="goToSettings">
            <img src="/src/assets/SettingsIcon.png" alt="Settings Icon" />
          </div>
          <div class="cart-icon" @click="goToCart">
            <img src="/src/assets/CartIcon.png" alt="Cart Icon" />
            <span v-if="store.cart.size > 0" class="cart-count">{{ store.cart.size }}</span>
          </div>
          <button @click="logout" class="button logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #111;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
}

.logo {
  margin-right: 30px;
}

.logo-img {
  height: 50px;
  width: auto;
}

.navbar {
  display: flex;
  align-items: center;
  gap: 25px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 230px;
  max-width: 300px;
}

.search-input {
  padding: 10px 35px 10px 15px;
  border: 2px solid #D4AF37;
  border-radius: 25px;
  background-color: #222;
  color: white;
  font-size: 14px;
  width: 100%;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #D4AF37;
}

.search-input:focus {
  background-color: #333;
  border-color: #FFD700;
}

.search-icon {
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.search-icon:hover {
  opacity: 0.7;
}

.welcome-msg {
  color: #D4AF37;
  font-size: 1.25rem;
  font-weight: bold;
  padding-left: 15px;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  transition: transform 0.3s ease;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.settings-icon,
.cart-icon,
.logout {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s ease;
}

.settings-icon img,
.cart-icon img {
  width: 35px;
  height: 35px;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e50914;
  color: white;
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 50%;
  min-width: 8px;
  text-align: center;
  font-weight: bold;
}

.navbar .button {
  background-color: #D4AF37;
  color: black;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.navbar .button:hover {
  background-color: #FFD700;
  transform: translateY(-2px);
}

.logout button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.logout button:hover {
  background-color: #d40811;
  transform: translateY(-2px);
}

.settings-icon:hover,
.cart-icon:hover,
.logout:hover {
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
  }

  .navbar {
    margin-top: 15px;
    flex-direction: column;
    gap: 15px;
  }

  .search-input {
    width: 200px;
  }

  .logo-img {
    height: 45px;
  }
}
</style>