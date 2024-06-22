import { defineStore } from "pinia";
import axios from "axios";

export const useRecipeStore=defineStore('recipeStore',{
    state:()=>({
        searchQuery:'',
        recipes:[],
        searchByIngredient:false,
        recipeDetail:[],
        categories: [],
        loading:false,
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
        async fetchCategories() {
            try {
              const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
              this.categories = response.data.categories || [];
            } catch (error) {
              console.error('Error fetching categories', error);
              this.categories = [];
            }
        },
        async fetchRecipeDetail(id) {
            try {
                this.loading=true;
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                this.recipeDetail = await response.data.meals[0] || [];[]
            } catch (error) {
                console.error('Error fetching recipe detail', error);
                this.recipeDetail = [];
            }finally{
                this.loading=false;
            }
        },
        setSearchQuery(query,searchByIngredient){
            this.searchQuery=query;
            this.fetchRecipes(query,searchByIngredient);
        }
    },
    
})