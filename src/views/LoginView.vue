<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { auth } from "../firebase"

// Initialize Pinia store and router
const store = useStore();
const router = useRouter();

// Variables to store email and password input
const email = ref("");
const password = ref("");

const handleLogin = () => {
  store.loginUser(email.value, password.value);   //  this checks if the entered email and password match the ones in the store

  if (store.isLoggedIn) {
    router.push("/movies");  // this redirects to the movies page if your logged in
  } else {
    alert("Invalid email or password.");
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Enter your Email" class="input-field" required />
        <input v-model="password" type="password" placeholder="Enter your Password" class="input-field" required />
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 40px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 1;
}

.login-container h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #FFD700;
}

.input-field {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #333;
  color: #fff;
  font-size: 1.1em;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #FFD700;
  outline: none;
}

button {
  background-color: #FFD700;
  color: black;
  padding: 15px 30px;
  border: none;
  border-radius: 30px;
  font-size: 1.2em;
  cursor: pointer;
  width: 100%;
  margin: 2px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #FFC107;
  transform: translateY(-5px);
}

@media (max-width: 480px) {
  .login-container {
    width: 90%;
  }
}
</style>