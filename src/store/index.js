import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase'; // Assuming you are using Firebase Authentication

export const useStore = defineStore('store', () => {
  // State variables
  const email = ref('');
  const firstName = ref('');
  const lastName = ref('');
  const isLoggedIn = ref(false);
  const cart = ref(new Map());

  // User state from Firebase
  const user = ref(null);

  // Register user
  const registerUser = (userInfo) => {
    firstName.value = userInfo.firstName;
    lastName.value = userInfo.lastName;
    email.value = userInfo.email;
    isLoggedIn.value = true;
  };

  // Login user
  const loginUser = (emailInput, passwordInput) => {
    if (emailInput === email.value && passwordInput === password.value) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  };

  const logoutUser = () => {
    email.value = '';
    firstName.value = '';
    lastName.value = '';
    cart.value.clear();
    isLoggedIn.value = false;
    user.value = null; // clear user data
  };

  // Firebase Authentication listener for user state change
  const authListener = () => {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        user.value = firebaseUser; 
        isLoggedIn.value = true;
        // this receives cart data from localStorage or default value
        const storedCart = localStorage.getItem(`cart_${firebaseUser.email}`);
        cart.value = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
      } else {
        user.value = null;
        isLoggedIn.value = false;
        cart.value.clear();
      }
    });
  };
  authListener();

  return {
    email,
    firstName,
    lastName,
    isLoggedIn,
    user,
    cart,
    registerUser,
    loginUser,
    logoutUser,
  };
});
