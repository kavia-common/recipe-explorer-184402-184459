<template>
  <div class="layout-root">
    <NavBar />

    <div class="container">
      <div class="layout-grid">
        <!-- Sidebar is optional; displayed when page provides a #sidebar slot -->
        <aside v-if="$slots.sidebar" class="sidebar card" aria-label="Category and filters sidebar">
          <slot name="sidebar" />
        </aside>

        <main class="content" role="main">
          <slot />
        </main>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Default layout wires top navigation, optional sidebar, content, and footer.
// Sidebar toggles based on slot presence to keep mobile compact.
</script>

<style scoped>
.layout-root {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 1.25rem 0 2rem;
}

/* Wider layout with sidebar on medium+ screens */
@media (min-width: 980px) {
  .layout-grid {
    grid-template-columns: 280px 1fr;
  }
}

.sidebar {
  padding: 1rem;
  position: sticky;
  top: 1rem;
  height: max-content;
}

.content {
  min-width: 0;
}
</style>
