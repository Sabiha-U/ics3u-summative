import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";  // Ensure you have your Firebase auth setup

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());

  // Sync cart with localStorage
  const syncCart = () => {
    const storedCart = localStorage.getItem(`cart_${user.value?.email}`);
    cart.value = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
  };

  // Listen to Firebase auth state changes
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;  // Set the user from Firebase
      syncCart();  // Sync the cart when the user logs in
    } else {
      user.value = null;  // If not logged in, clear the user
      cart.value = new Map();  // Clear the cart if not logged in
    }
  });

  return { user, cart, syncCart };
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (firebaseUser) => {
    try {
      const store = useStore();
      store.user = firebaseUser;
      store.syncCart(); // Sync cart when user is authenticated
      resolve();
    } catch (error) {
      reject(error);
    }
  });
});