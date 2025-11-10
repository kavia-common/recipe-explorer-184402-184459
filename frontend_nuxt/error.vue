<template>
  <section class="container">
    <div class="card box">
      <h1 class="title">Page not found</h1>
      <p class="text">The page you’re looking for doesn’t exist.</p>
      <NuxtLink to="/" class="btn">Go Home</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Recipe Explorer • Not Found' });
</script>

<style scoped>
.box {
  margin: 2rem auto;
  max-width: 640px;
  padding: 1.25rem;
  text-align: center;
}
.title { margin: 0; font-size: 1.6rem; font-weight: 900; }
.text { color: #4b5563; }
</style>
