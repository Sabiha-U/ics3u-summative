import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());

  // this is a firebase authentication listener
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;

      // this loads cart from localStorage or initialize with an empty cart
      const storedCart = localStorage.getItem(`cart_${firebaseUser.email}`);
      if (storedCart) {
        cart.value = new Map(Object.entries(JSON.parse(storedCart)));
      } else {
        cart.value = new Map();
      }
    } else {
      user.value = null;
      cart.value.clear();
    }
  });

  // this is a computed property to check if the user is logged in
  const isLoggedIn = computed(() => !!user.value);

  // this saves cart to localStorage whenever it's updated
  const saveCart = () => {
    if (user.value) {
      localStorage.setItem(`cart_${user.value.email}`, JSON.stringify(Object.fromEntries(cart.value)));
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
    user.value = null;
    cart.value.clear();
    localStorage.removeItem(`cart_${user.value?.email}`);  // Clear cart from localStorage
  };

  const addToCart = (itemId, quantity) => {
    cart.value.set(itemId, (cart.value.get(itemId) || 0) + quantity);
    saveCart();
  };

  const removeFromCart = (itemId) => {
    if (cart.value.has(itemId)) {
      cart.value.delete(itemId);
      saveCart();
    }
  };

  const clearCart = () => {
    cart.value.clear();
    saveCart();  // saves the cleared cart to localStorage
  };

  // this is a shortcut, watchs for cart changes and persist them to localStorage automatically
  watch(cart, saveCart, { deep: true });

  return {
    user,
    cart,
    isLoggedIn,
    addToCart,
    removeFromCart,
    clearCart,
    logoutUser,
  };
});
