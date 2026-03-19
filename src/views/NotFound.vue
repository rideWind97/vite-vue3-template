<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="text-6xl font-bold text-gray-300">404</h1>
    <p class="mt-4 text-gray-500">页面不存在</p>
    <button
      class="mt-6 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
      @click="router.push('/')"
    >
      返回首页
    </button>
  </div>
</template>
