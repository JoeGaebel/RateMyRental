<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>

  <div class="wrapper">
    <h1 class="title">Rate My Rental</h1>
    <RouterView />
  </div>
</template>

<style scoped>
.title {
  font-size: 6rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
