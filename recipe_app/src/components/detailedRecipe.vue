<template>
    <div class="p-4">
        <div v-if="recipeStore.loading" class=" flex justify-center items-center text-center loader "></div>
        <div v-else class="recipe-detail max-w-2xl mx-auto">
            <img :src="recipeDetail.strMealThumb" :alt="recipeDetail.strMeal" class="w-full h-auto rounded-lg" />
            <h2 class="text-2xl font-bold mt-4" >{{ recipeDetail.strMeal }}</h2>
            <h3 class="text-xl mt-2">Ingredients</h3>
            <ul class="list-disc list-inside">
                <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
            </ul>
            <h3 class="text-xl mt-4">Instructions</h3>
            <p>{{ recipeDetail.strInstructions }}</p>
        </div>
    </div>
  </template>

<script setup>
    import { computed, onMounted} from 'vue';
    
    import {useRecipeStore} from '@/stores/recipeStore';
    const recipeStore=useRecipeStore();

    import { useRoute } from 'vue-router';
    const route= useRoute();

    const recipeDetail=computed(()=>recipeStore.recipeDetail);
    

    const ingredients=computed(()=>{
        if(!recipeDetail.value) return [];
        const ingredientsList=[];
        for (let i=1; i<=20; i++){
            const ingredient=recipeDetail.value[`strIngredient${i}`];
            const measure=recipeDetail.value[`strMeasure${i}`];
            
            if(ingredient){
                ingredientsList.push(`${ingredient}-${measure}`);
            }
        }
        return ingredientsList;
    })

    onMounted(()=>{
        const mealID=route.params.id;
        recipeStore.fetchRecipeDetail(mealID);
    })
</script>

<style scoped>
     .loader {
        width: 60px;
        aspect-ratio: 1;
        border-radius: 50%;
        -webkit-mask:linear-gradient(0deg,#000 55%,#0000 0) bottom/100% 18.18%;
        mask:linear-gradient(0deg,#000 55%,#0000 0) bottom/100% 18.18%;
        background:linear-gradient(#f03355 0 0) bottom/100% 0% no-repeat #ddd;
        animation: l8 2s infinite steps(7);
    }
    @keyframes l8 {
        100% {background-size:100% 115%}
    }
</style>
  