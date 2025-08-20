<template>
  <!-- 背景遮罩：高斯模糊 -->
  <div
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <!-- 卡片主体 -->
    <div class="bg-white rounded-lg max-w-4xl w-full mx-4 flex relative shadow-2xl">
      <!-- 右上角关闭按钮 -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg font-bold"
      >
        ×
      </button>

      <!-- 左侧封面 -->
      <img
        :src="anime.coverImage.large"
        class="w-1/3 object-cover rounded-l-lg"
      />

      <!-- 右侧信息 -->
      <div class="flex-1 p-6 space-y-3">
        <h2 class="text-2xl font-bold">{{ anime.title.romaji }}</h2>
        <p class="text-sm text-gray-600">
          <span>集数：{{ anime.episodes ?? '未知' }}</span> ·
          <span>类型：{{ anime.genres?.join(' / ') }}</span>
        </p>
        <p
          class="text-sm leading-relaxed h-40 overflow-y-auto"
          v-html="anime.description"
        ></p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ anime: Object })
</script>