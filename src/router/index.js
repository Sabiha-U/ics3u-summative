import { createWebHistory, createRouter } from 'vue-router';
import { useStore } from '../store';
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
        meta: { auth: false }
    },
    {
        path: '/movies',
        component: MoviesView,
        meta: { auth: false },
    },
    {
        path: '/movies/:id',
        component: DetailsView,
        meta: { auth: false },
    },
    {
        path: '/settings',
        component: SettingsView,
        meta: { auth: false }
    },
];

// creates the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard to protect private routes
router.beforeEach((to, from, next) => {
    const store = useStore();

    // this checks if the route requires authentication and if the user is logged in
    if (to.meta.auth && !store.user) {
        next('/login');
    } else {
        next(); // this proceeds to the route if authorized
    }
});

export default router;
