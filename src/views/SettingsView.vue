<script setup>
import { useStore } from "../store";
import { ref } from "vue";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth } from "../firebase";

const store = useStore();

const firstName = ref(store.firstName);
const lastName = ref(store.lastName);
const newPassword = ref("");

// Checks if the user is logged in with Google
const isGoogleUser = auth.currentUser?.providerData?.some(
  provider => provider.providerId === "google.com"
);

const saveChanges = async () => {
  // this makes sure user is logged in with email
  if (auth.currentUser && !isGoogleUser) {
    store.firstName = firstName.value;
    store.lastName = lastName.value;

    try {
      await updateProfile(auth.currentUser, {
        displayName: `${firstName.value} ${lastName.value}`,
      });
      alert("Your changes have been saved successfully!");
      if (newPassword.value) {
        await updatePassword(auth.currentUser, newPassword.value);
        alert("Password updated successfully!");
      }
    } catch (error) {
      alert("Failed to update your password. Please try again.");
    }
  } else {
    alert("You cannot modify your profile when logged in via Google.");
  }
};
</script>

<template>
  <div class="settings-view">
    <h1>Settings</h1>
    <div class="user-info">
      <label for="first-name">First Name:</label>
      <input id="first-name" v-model="firstName" type="text" :disabled="isGoogleUser" />
    </div>

    <div class="user-info">
      <label for="last-name">Last Name:</label>
      <input id="last-name" v-model="lastName" type="text" :disabled="isGoogleUser" />
    </div>

    <div class="user-info">
      <label for="email">Email:</label>
      <input id="email" v-model="store.user.email" type="email" disabled />
    </div>

    <div class="user-info">
      <label for="new-password">New Password:</label>
      <input id="new-password" v-model="newPassword" type="password" :disabled="isGoogleUser" />
    </div>

    <button @click="saveChanges" :disabled="isGoogleUser">Save Changes</button>
  </div>
</template>

<style scoped>
.settings-view {
  padding: 20px;
  background-color: #141414;
  color: white;
}

h1 {
  color: #ffd700;
  text-align: center;
  font-size: 2.1rem;
}

.user-info {
  margin-bottom: 15px;
}

label {
  font-size: 1.1rem;
}

input {
  padding: 8px;
  margin-top: 5px;
  font-size: 1rem;
}

button {
  background-color: #d4af37;
  color: black;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ffd700;
}

button:disabled {
  background-color: #888;
  cursor: not-allowed;
}
</style>