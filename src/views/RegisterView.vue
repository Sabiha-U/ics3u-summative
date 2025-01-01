<script setup>
import { ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { auth } from "../firebase";

const store = useStore();
const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = () => {
  if (!firstName.value, !lastName.value, !email.value, !password.value, !confirmPassword.value) {
    alert("All fields are required.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  store.registerUser({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  });

  router.push("/movies");
};
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Create An Account</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="firstName" type="text" placeholder="Enter your First Name" class="input-field" required />
        <input v-model="lastName" type="text" placeholder="Enter your Last Name" class="input-field" required />
        <input v-model="email" type="email" placeholder="Enter your Email" class="input-field" required />
        <input v-model="password" type="password" placeholder="Enter your password" class="input-field" required />
        <input v-model="confirmPassword" type="password" placeholder="Re-enter your password" class="input-field"
          required />
        <button type="submit" class="login-btn">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
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

.register-container h2 {
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

.login-btn {
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

.login-btn:hover {
  background-color: #FFC107;
  transform: translateY(-5px);
}

@media (max-width: 480px) {
  .register-container {
    width: 90%;
  }
}
</style>