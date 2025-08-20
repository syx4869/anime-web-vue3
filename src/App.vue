<template>
  <div class="bg-gray-100 min-h-screen">
    <SearchBar />
    <RouterView />
  </div>
</template>

<script setup>
import SearchBar from "./components/SearchBar.vue";
</script>
