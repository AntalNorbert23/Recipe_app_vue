<template>
     <div class="loader border-4 border-t-blue-500 border-solid rounded-full w-10 h-10 absolute left-1/2 top-1/2"
          v-if="loading"
     ></div>
    <div v-else>
        <Header/>
        <router-view/>
    </div>
</template>

<script setup>
    import Header from '@/components/navigation/header.vue'
    import { firstLoad } from './composables/autoLogin';

    const { loading } = firstLoad();
</script>

<style scoped>
    @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loader {
    animation: spin 1s linear infinite;
  }
</style>