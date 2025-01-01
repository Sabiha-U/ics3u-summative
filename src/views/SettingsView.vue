<script setup>
import { useStore } from "../store";
import { ref } from "vue";
import { auth } from "../firebase";

const store = useStore();

const firstName = ref(store.firstName);
const lastName = ref(store.lastName);

const saveChanges = () => {
  store.firstName = firstName.value;
  store.lastName = lastName.value;
  alert("Your changes have been saved!");
};
</script>

<template>
  <div class="settings-view">
    <h1>Settings</h1>

    <div class="user-info">
      <label for="first-name">First Name:</label>
      <input id="first-name" v-model="firstName" type="text" />
    </div>

    <div class="user-info">
      <label for="last-name">Last Name:</label>
      <input id="last-name" v-model="lastName" type="text" />
    </div>

    <div class="user-info">
      <label for="email">Email:</label>
      <input id="email" v-model="store.email" type="email" disabled />
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