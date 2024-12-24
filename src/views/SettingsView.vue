<script setup>
import { useStore } from "../store";
import { ref } from "vue";
import { updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../firebase";  // Make sure Firebase is initialized

const store = useStore();

const firstName = ref(store.firstName);
const lastName = ref(store.lastName);
const password = ref(""); // For password change

// Check if user is logged in via email
const isEmailUser = store.user && store.user.providerData[0].providerId === 'password';

const saveChanges = async () => {
  // Update user's profile in Firebase (first name and last name)
  if (isEmailUser) {
    try {
      // Update display name in Firebase
      await updateProfile(auth.currentUser, {
        displayName: `${firstName.value} ${lastName.value}`,
      });

      // Optionally, update the email if needed
      // await updateEmail(auth.currentUser, newEmail); // Example if email update is needed

      // Update Pinia store
      store.firstName = firstName.value;
      store.lastName = lastName.value;

      alert("Your changes have been saved!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Error saving changes!");
    }
  } else {
    alert("You can only edit your details if logged in with email.");
  }
};
</script>

<template>
  <div class="settings-view">
    <h1>Settings</h1>

    <div class="user-info">
      <label for="first-name">First Name:</label>
      <input
        id="first-name"
        v-model="firstName"
        type="text"
        :disabled="!isEmailUser"
      />
    </div>

    <div class="user-info">
      <label for="last-name">Last Name:</label>
      <input
        id="last-name"
        v-model="lastName"
        type="text"
        :disabled="!isEmailUser"
      />
    </div>

    <div class="user-info">
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="store.user?.email"
        type="email"
        disabled
      />
    </div>

    <!-- Only show password change input if logged in with email -->
    <div v-if="isEmailUser" class="user-info">
      <label for="password">Change Password:</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter new password"
      />
    </div>

    <button @click="saveChanges">Save Changes</button>
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
</style>
