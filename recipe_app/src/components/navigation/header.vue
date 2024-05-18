<template>
    <header class="flex border-2 border-amber-400">
        <div class="logo">
            <router-link :to="{ name: 'home' }">
                <img src="\src\assets\images\logo\logo-mini.jpg" alt="" class="h-16 w-16 ms-5 my-2">
            </router-link>
        </div>
        <div class="flex items-center flex-1 justify-end">
            <ul class="flex items-center h-full">
                <li class="h-full w-full flex items-center hover:bg-amber-200 hover:cursor-pointer hover:text-red-500 hover:font-semibold">
                    <router-link :to="{ name: 'home' }" class="flex items-center w-full h-full px-4">
                        HOME
                    </router-link>
                </li>
                <li class="h-full w-full flex items-center hover:bg-amber-200 hover:cursor-pointer hover:text-red-500 hover:font-semibold">
                    <router-link :to="{ name: 'recipe' }" class="flex items-center w-full h-full px-4">
                        RECIPES
                    </router-link>
                </li>
                <li class="h-full w-full flex items-center hover:bg-amber-200 hover:cursor-pointer hover:text-red-500 hover:font-semibold">
                    <router-link :to="{ name: 'popular' }" class="flex items-center w-full h-full px-4">
                        POPULAR
                    </router-link>
                </li>
                <li class="h-full w-full flex items-center hover:bg-amber-200 hover:cursor-pointer hover:text-red-500 hover:font-semibold">
                    <router-link :to="{ name: 'savedRecipes' }" class="flex items-center w-full h-full px-4">
                        SAVED
                    </router-link>
                </li>
                <li class="h-full w-full flex items-center hover:bg-amber-200 hover:cursor-pointer hover:text-red-500 hover:font-semibold">
                    <router-link :to="{ name: 'signin' }" class="flex items-center justify-center w-24 h-full px-4 ">
                        SIGN IN
                    </router-link>
                </li>
                <li class="ps-2 pe-5 h-full flex items-center relative">
                    <transition
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                        <input type="text"
                               class="focus:border-blue-400 border-[1px] border-black rounded ps-8 py-1"
                               :placeholder="ingredientOrRecipe ? 'Search for ingredient' : 'Search for recipe'"
                               v-if="searchInputVisible"
                        >
                    </transition>
                    <i class="fa fa-search ps-2 hover:cursor-pointer hover:text-red-500" @click="showSearchInput"></i>
                    <i class="fa fa-edit absolute left-4 top-1/2 transform -translate-y-1/2 hover:cursor-pointer hover:text-amber-400"
                       v-show="editVisible"
                       @click="changeTypeOfSearch"
                    ></i>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
    import { ref } from 'vue';

    const searchInputVisible=ref(false);
    const ingredientOrRecipe=ref(true);
    const editVisible=ref(false);

    const showSearchInput=()=>{
        searchInputVisible.value=!searchInputVisible.value;
        setTimeout(() => {
            editVisible.value=!editVisible.value;
        }, 400);
    }

    const changeTypeOfSearch =()=>{
        ingredientOrRecipe.value=!ingredientOrRecipe.value;
    }
</script>