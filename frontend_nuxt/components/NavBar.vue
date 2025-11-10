<template>
  <header class="nav">
    <div class="container nav-inner">
      <NuxtLink to="/" class="brand" aria-label="Recipe Explorer Home">
        <span class="logo" aria-hidden="true">🍳</span>
        <span class="title">Recipe Explorer</span>
      </NuxtLink>

      <nav class="links" aria-label="Primary navigation">
        <NuxtLink to="/" class="link" :class="{ active: route.path === '/' }">Home</NuxtLink>
        <NuxtLink to="/categories" class="link" :class="{ active: route.path.startsWith('/categories') }">Categories</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped>
.nav {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 30;
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .8rem 0;
  justify-content: space-between;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  text-decoration: none;
}

.logo {
  font-size: 1.4rem;
}

.title {
  font-weight: 800;
  letter-spacing: 0.2px;
  font-size: 1.05rem;
  color: var(--color-text);
}

.links {
  display: inline-flex;
  gap: .5rem;
}

.link {
  padding: .45rem .8rem;
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-text);
  border: 1px solid transparent;
  transition: background var(--transition), color var(--transition), border-color var(--transition);
}

.link:hover {
  background: #eef2ff;
  color: #1e3a8a;
}

.link.active {
  background: var(--color-primary);
  color: white;
  border-color: rgba(37,99,235,.2);
}
</style>
