<template>
    <div v-if="isVisible" class="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 class="text-lg font-bold mb-4">Confirm Logout</h2>
        <p class="mb-4">Are you sure you want to log out?</p>
        <div class="flex justify-end">
          <button @click="confirmLogout" class="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes</button>
          <button @click="cancelLogout" class="bg-gray-300 text-black px-4 py-2 rounded">No</button>
        </div>
      </div>
    </div>
</template>

<script setup>
    const props=defineProps({
        isVisible:Boolean,
    });

    const emit=defineEmits(['confirm', 'cancel']);

    const confirmLogout=()=>{
        emit('confirm');
    }

    const cancelLogout=()=>{
        emit('cancel');
    }
</script>