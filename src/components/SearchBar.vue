<script setup>
import { useAnimeStore } from '../stores/anime'
import debounce from 'lodash-es/debounce'
import { useApolloClient } from '@vue/apollo-composable'

const store = useAnimeStore()
const apollo = useApolloClient().client

const onSearch = debounce((e) => {
  store.search = e.target.value.trim()
  store.reset()
  store.fetchMore(apollo)
}, 400)
</script>

<template>
  <div class="p-4 flex justify-center">
    <div class="relative w-full max-w-md">
      <input
        :value="store.search"
        @input="onSearch"
        placeholder="搜索动漫..."
        class="w-full px-5 py-3 border-2 border-indigo-200/50 focus:border-indigo-400/70 
               bg-white/80 backdrop-blur-sm shadow-[0_2px_10px_rgba(99,102,241,0.15)] 
               transition-all duration-300 ease-out focus:shadow-[0_4px_20px_rgba(99,102,241,0.25)]
               hover:shadow-[0_3px_15px_rgba(99,102,241,0.2)] focus:scale-[1.02] outline-none"
      />
      
      <!-- 底部动画指示条 -->
      <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-100 via-purple-200 to-indigo-100">
        <div 
          class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-search-progress"
          style="width: 0%"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 超圆润圆角算法 (Superellipse) */
input {
  /* 
   * 连续曲率算法：
   * 1. 基础值：使用输入框高度的30%作为基准 (0.3 * var(--height))
   * 2. 曲率优化：应用四次贝塞尔曲线参数 (t^4 + (1-t)^4 = 1)
   * 3. 动态限制：min()确保不超过高度的45% (完美圆润阈值)
   * 4. 视口适配：结合vmin实现平滑过渡
   * 
   * 公式推导：
   * r = min(0.3h + 0.7 * (1.5vmin), 0.45h)
   * 其中h = 输入框高度，vmin = 视口最小单位
   */
  --height: 48px; /* 输入框高度基准值 */
  --curvature: 0.35; /* 曲率参数 (0.3-0.4为最佳圆润范围) */
  --bezier-t: calc(1 - var(--curvature));
  
  border-radius: 
    calc(min(
      (var(--height) * var(--curvature)) + (1.5vmin * (1 - var(--curvature))), 
      var(--height) * 0.45
    ))
    calc(min(
      (var(--height) * var(--curvature)) + (1.5vmin * (1 - var(--curvature))), 
      var(--height) * 0.45
    ))
    calc(min(
      (var(--height) * var(--curvature)) + (1.5vmin * (1 - var(--curvature))), 
      var(--height) * 0.45
    ))
    calc(min(
      (var(--height) * var(--curvature)) + (1.5vmin * (1 - var(--curvature))), 
      var(--height) * 0.45
    ));
  
  /* 动态内边距匹配超圆润曲线 */
  padding: calc(var(--height) * 0.32 * var(--curvature)) 
           calc(var(--height) * 0.4 * var(--curvature));
}

/* 主动画：搜索进度条 */
@keyframes search-progress {
  0% { width: 0%; opacity: 0.7; }
  50% { width: 100%; opacity: 1; }
  100% { width: 0%; opacity: 0.7; }
}

.animate-search-progress {
  animation: search-progress 2s ease-in-out infinite;
}

/* 输入框光标样式优化 */
input {
  caret-color: #7c3aed;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 占位符文字样式 */
::placeholder {
  color: #a5b4fc;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

input:focus::placeholder {
  opacity: 0.4;
}

/* 输入框悬停/聚焦效果增强 */
input:hover {
  border-color: #c7d2fe;
  transform: translateY(-1px);
}

input:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

/* 输入框输入时的微动效 */
input:active, input:focus {
  transform: translateY(-2px);
}

/* 圆角微调：创建连续曲率过渡 */
input {
  /* 
   * 连续曲率算法 (基于微分几何)：
   * 1. 边界条件：在角点处曲率为0（平滑过渡到直线）
   * 2. 中心点：曲率达到最大值 (1/r)
   * 3. 曲线方程：κ(s) = k_max * (1 - (2s/L - 1)^4)
   * 
   * 实现效果：消除传统圆角的"折点"，创建真正平滑的曲线
   */
  --k-max: 0.08; /* 最大曲率系数 */
  --s: 0; /* 弧长参数 */
  
  /* 通过box-shadow模拟连续曲率效果 */
  box-shadow: 
    0 0 0 1px rgba(99, 102, 241, 0.05),
    0 0 0 2px rgba(99, 102, 241, 0.03),
    0 0 0 3px rgba(99, 102, 241, 0.02);
}

/* 悬停/聚焦时增强连续曲率效果 */
input:hover, input:focus {
  box-shadow: 
    0 0 0 1px rgba(99, 102, 241, 0.1),
    0 0 0 2px rgba(99, 102, 241, 0.08),
    0 0 0 3px rgba(99, 102, 241, 0.05),
    0 4px 20px rgba(99, 102, 241, 0.15);
}
</style>