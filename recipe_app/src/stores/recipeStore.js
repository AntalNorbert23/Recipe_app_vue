import { defineStore } from "pinia";
import axios from "axios";

export const useRecipeStore=defineStore('recipeStore',{
    state:()=>({
        searchQuery:'',
        recipes:[],
        searchByIngredient:false,
    }),
    actions:{
        async fetchRecipes(query,searchByIngredient){
            if (!query) return;

            let url;
            if(searchByIngredient){
                url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
            }else{
                url =` https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
            }

            try{
                const response= await axios.get(url);
                this.recipes=await response.data.meals || [];
            }catch(error){
                console.error('Error fetching resipes',error);
                this.recipes=[];
            }
        },
       
        setSearchQuery(query,searchByIngredient){
            this.searchQuery=query;
            this.fetchRecipes(query,searchByIngredient);
        }
    },
    
})