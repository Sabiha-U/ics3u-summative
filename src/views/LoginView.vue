<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { auth } from "../firebase";

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim());
    store.user = userCredential.user;
    router.push("/movies");
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("No user found with this email. Please register first.");
    } else if (error.code === "auth/wrong-password") {
      alert("Incorrect password. Please try again.");
    } else {
      console.error("Error suring login:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  }
};

const loginByGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    // this checks if the Google user is already registered
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      alert("This Google account is not registered. Please register first.");
      return;
    }

    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error signing in with Google. Please try again.");
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
      <button @click="loginByGoogle" class="google-btn">Login with Google</button>
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
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
}

.login-container h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #FFD700;
}

.input-field {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #333;
  color: #fff;
  font-size: 1em;
}

button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.login-btn {
  background: #FFD700;
  color: black;
}

.google-btn {
  background: #4285F4;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>
