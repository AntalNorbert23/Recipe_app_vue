<template>
    <div class="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 min-h-screen">
        <div v-if="recipeStore.loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 loader"></div>
        <div v-else class="recipe-detail max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-4xl font-bold flex justify-center pb-6 text-gray-800">{{ recipeDetail.strMeal }}</h2>
            <div class="flex mb-4">
                <img :src="recipeDetail.strMealThumb" :alt="recipeDetail.strMeal" class="w-96 h-auto rounded-lg border-4 border-gray-300 shadow-md mr-32" />
                <div class="ml-4 flex flex-col justify-center flex-1">
                    <h3 class="text-xl font-semibold mt-2 text-gray-700">Ingredients</h3>
                    <ul class="list-disc list-inside text-lg text-gray-600">
                        <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
                    </ul>
                </div>
            </div>
            <div class="instructions w-full mt-6">
                <h3 class="text-xl font-semibold mb-2 text-gray-700">Instructions</h3>
                <ol class="list-decimal list-inside text-lg text-gray-600">
                    <li v-for="(step, index) in instructionSteps" :key="index">{{ step }}</li>
                </ol>
            </div>
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

    const instructionSteps = computed(() => {
        if (!recipeDetail.value || !recipeDetail.value.strInstructions) return [];
        return recipeDetail.value.strInstructions.split('\n').filter(step => step.trim() !== '');
    });

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
  