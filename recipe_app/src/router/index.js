import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/home/home.vue';
import Signin from '@/components/user/signin.vue';
import Recipe from '@/components/recipe.vue';
import Popular from '@/components/popular.vue';
import SavedRecipes from '@/components/user/savedRecipes.vue';
import SearchedRecipes from '@/components/searchedRecipes.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',name: 'home',component: Home},
    {path: '/signin',name: 'signin',component: Signin},
    {path: '/recipe',name: 'recipe',component: Recipe},
    {path: '/popular',name: 'popular',component: Popular},
    {path: '/searchedRecipes',name: 'searchedRecipes',component: SearchedRecipes},
    {path: '/user/savedRecipes',name: 'savedRecipes',component: SavedRecipes},
  ]
})

export default router
