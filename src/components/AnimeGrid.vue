<template>
  <!-- 热门动漫标题与搜索结果数量 -->
  <div class="mb-4 text-center">
    <h2 v-if="!store.search" class="text-2xl font-bold">热门动漫</h2>
    <p v-if="store.search && store.list.length > 0" class="text-2xl font-bold">找到 {{ store.list.length }} 个结果</p>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6 justify-items-center px-4">
    <AnimeCard
      v-for="anime in store.list"
      :key="anime.id"
      :anime="anime"
      @click="selected = anime"
    />
  </div>

  <!-- 空结果提示 -->
  <p v-if="store.list.length === 0 && !store.loading" class="col-span-full text-center py-10">
    暂无“{{ store.search }}”相关动漫
  </p>

  <!-- 加载占位 -->
  <p v-if="store.loading" class="col-span-full text-center py-10">
    加载中…
  </p>

  <!-- 无限滚动触发点 -->
  <div id="load-more" class="h-10 col-span-full"></div>

  <!-- 详情弹窗 -->
  <AnimeDetail v-if="selected" :anime="selected" @close="selected = null" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useApolloClient } from '@vue/apollo-composable';
import { useAnimeStore } from '../stores/anime';
import AnimeCard from './AnimeCard.vue';
import AnimeDetail from './AnimeDetail.vue';

const store = useAnimeStore();
const apollo = useApolloClient().client;
const selected = ref(null);

// 首次加载热门
onMounted(() => {
  if (!store.list.length) {
    store.reset();
    store.fetchMore(apollo);
  }
});

// 无限滚动
useIntersectionObserver(
  document.querySelector('#load-more'),
  ([{ isIntersecting }]) => isIntersecting && store.hasNextPage && store.fetchMore(apollo)
);
</script>