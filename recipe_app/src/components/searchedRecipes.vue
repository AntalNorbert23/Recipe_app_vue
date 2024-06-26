<template>
    <div class="p-4">
        <div v-if="recipes.length === 0" class="text-center text-2xl text-red-400">
           Sorry no recipes found.
        </div>
        <div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="recipe in recipes" :key="recipe.idMeal" class="recipe-card p-2 border rounded-lg shadow-lg hover:cursor-pointer" @click="viewRecipe(recipe.idMeal)">
                <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="w-full h-60 object-cover rounded-lg" />
                <p class="mt-2 text-center font-semibold">{{ recipe.strMeal }}</p>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
    import { computed} from 'vue';

    import { useRecipeStore } from '@/stores/recipeStore';
    const recipeStore = useRecipeStore();

    import {useRouter} from 'vue-router';
    const router=useRouter();

    const recipes = computed(() => recipeStore.recipes);

    const viewRecipe=(id)=>{
        router.push({name:'detailedRecipe',params:{id}})
    }

  </script>
  
  <style scoped>
    .recipe-card {
        transition: transform 0.3s ease-in-out;
    }
    .recipe-card:hover {
        transform: scale(1.05);
    }
  </style>
  