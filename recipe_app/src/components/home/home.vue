<template>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div 
            v-for="category in topCategories" 
            :key="category.idCategory" 
            class="category-card relative pb-2/3 hover:cursor-pointer hover:opacity-75"
            @click="fetchCategoryRecipes(category.strCategory)"
        >
          <img :src="category.strCategoryThumb" :alt="category.strCategory" class="absolute h-full w-full object-cover rounded-lg shadow-md" />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white text-center rounded-b-lg">
            {{ category.strCategory }}
          </div>
        </div>
      </div>
  
      <div class="grid grid-cols-9 gap-4">
        <div
            v-for="category in additionalCategories" 
            :key="category.idCategory" 
            class="flex flex-col items-center hover:cursor-pointer ease-in-out transform hover:translate-y-1 hover:opacity-75 group"
            @click="fetchCategoryRecipes(category.strCategory)"
        >
          <img :src="category.strCategoryThumb" :alt="category.strCategory" class="w-20 h-20 rounded-full shadow-md " />
          <span class="mt-2 text-center group-hover:text-orange-500">{{ category.strCategory }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRecipeStore } from '@/stores/recipeStore';

  import { useRouter } from 'vue-router';
  const router =useRouter();
  
  const recipeStore = useRecipeStore();
  const topCategories = ref([]);
  const additionalCategories = ref([]);
  
  onMounted(async () => {
    await recipeStore.fetchCategories();
    topCategories.value = recipeStore.categories.slice(0, 4);
    additionalCategories.value = recipeStore.categories.slice(4, 13);
  });

  const fetchCategoryRecipes= async (category)=>{
      await recipeStore.fetchCategoriesRecipes(category);
      router.push({name:'searchedRecipes'});
  }
  </script>
  
  <style scoped>
    .container {
        max-width: 1200px;
    }
    .pb-2\/3 {
        padding-bottom: 66.6667%;
    }
    .category-card {
        transition: transform 0.3s ease-in-out;
    }
    .category-card:hover {
        transform: scale(1.05);
    }
  </style>
  