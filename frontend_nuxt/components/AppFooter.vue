<template>
  <footer class="footer">
    <div class="container foot-inner">
      <p class="small">
        <span class="muted">© {{ new Date().getFullYear() }} Recipe Explorer</span>
        <span aria-hidden="true">•</span>
        <span>Built with Nuxt 3</span>
      </p>
      <div class="actions">
        <a class="link" href="https://nuxt.com" target="_blank" rel="noopener">Nuxt Docs</a>
        <a class="link" href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(8px);
}
.foot-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .9rem 0;
  gap: 1rem;
}
.small {
  margin: 0;
  font-size: .9rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: .5rem;
}
.actions {
  display: inline-flex;
  gap: .6rem;
}
.link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}
.link:hover {
  text-decoration: underline;
}
.muted { color: #6b7280; }
</style>
