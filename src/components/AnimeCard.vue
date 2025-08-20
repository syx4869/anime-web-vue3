<template>
  <div
    class="w-[185px] cursor-pointer rounded overflow-hidden shadow hover:shadow-lg transition"
    @click="$emit('click')"
  >
    <img
      :data-src="anime.coverImage.large"
      class="lazy w-full aspect-[2/3] object-cover"
      v-lazy
    />
    <p class="p-2 text-sm text-center truncate">
      {{ anime.title.romaji }}
    </p>
  </div>
</template>

<script setup>
defineProps({ anime: Object });
</script>
