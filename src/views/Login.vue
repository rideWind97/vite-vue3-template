<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const username = ref("");
const password = ref("");

const handleLogin = () => {
  // TODO: 调用登录 API
  localStorage.setItem("token", "example-token");
  const redirect = (route.query.redirect as string) || "/";
  router.push(redirect);
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-80 space-y-4">
      <h1 class="text-center text-2xl font-bold">登录</h1>
      <input
        v-model="username"
        type="text"
        placeholder="用户名"
        class="w-full rounded border px-3 py-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="密码"
        class="w-full rounded border px-3 py-2"
      />
      <button
        class="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
        @click="handleLogin"
      >
        登录
      </button>
    </div>
  </div>
</template>
