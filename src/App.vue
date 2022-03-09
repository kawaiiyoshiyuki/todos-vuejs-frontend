<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import TodoLayout from "@/components/TodoLayout/TodoLayout.vue";
</script>

<template>
  <Header />

  <main>
    <TodoLayout />
  </main>

  <Footer />
</template>
