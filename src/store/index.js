import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('store', () => {
  // State variables 
  const email = ref(''); 
  const firstName = ref('');
  const lastName = ref('');
  const password = ref(''); 
  const isLoggedIn = ref(false);
  const cart = ref(new Map());

  // This registers the user 
  const registerUser = (userInfo) => {
    firstName.value = userInfo.firstName;
    lastName.value = userInfo.lastName;
    email.value = userInfo.email;
    password.value = userInfo.password;

    isLoggedIn.value = true;
  };

  // this logs in the user based on stored credentials 
  const loginUser = (emailInput, passwordInput) => {
    if (emailInput === email.value && passwordInput === password.value) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  };

  // this log's out user and clears data
  const logoutUser = () => {
    email.value = '';
    firstName.value = '';
    lastName.value = '';
    password.value = '';
    cart.value.clear();
    isLoggedIn.value = false;
  };

  return {
    email,
    firstName,
    lastName,
    password,
    cart,
    isLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
  };
});