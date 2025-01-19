import { createWebHistory, createRouter } from 'vue-router';
import { useStore } from '../store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import DetailsView from '../views/DetailView.vue';
import CartView from '../views/CartView.vue';
import SettingsView from '../views/SettingsView.vue';

// Define routes
const routes = [
    { path: '/', component: HomeView, meta: { auth: false } },
    { path: '/register', component: RegisterView, meta: { auth: false } },
    { path: '/login', component: LoginView, meta: { auth: false } },
    {
        path: '/cart',
        component: CartView,
        meta: { auth: true }
    },
    {
        path: '/movies',
        component: MoviesView,
        meta: { auth: false },
    },
    {
        path: '/movies/:id',
        component: DetailsView,
        meta: { auth: true },
    },
    {
        path: '/settings',
        component: SettingsView,
        meta: { auth: true }
    },
];

// this creates the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// this is the navigation guard to protect private routes
router.beforeEach((to, from, next) => {
    const store = useStore();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Updates the store's user data
            store.user = user;
        } else {
            // Clears the store's user data if not logged in
            store.user = null;
        }

        // used route guard logic
        if (to.meta.auth && !store.user) {
            next('/login'); 
        } else {
            next(); 
        }
    });
});

export default router;
