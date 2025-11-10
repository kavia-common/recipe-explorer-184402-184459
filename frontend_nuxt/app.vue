<template>
  <!-- App root applies ocean professional theme colors and background gradient -->
  <div class="min-h-screen bg-app">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// No global logic required here; layout + pages handle content.
// Accessible route announcer is already included.
</script>

<style>
/* Ocean Professional theme tokens (no Tailwind: utility-like classes) */
:root {
  --color-primary: #2563EB;
  --color-secondary: #F59E0B;
  --color-success: #F59E0B;
  --color-error: #EF4444;
  --color-bg: #f9fafb;
  --color-surface: #ffffff;
  --color-text: #111827;
  --shadow-md: 0 6px 16px rgba(0,0,0,0.08);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --radius: 14px;
  --radius-sm: 10px;
  --radius-lg: 18px;
  --transition: 180ms ease;
}

/* Subtle gradient from blue-500/10 to gray-50 */
.bg-app {
  background: linear-gradient(180deg, rgba(59,130,246,0.08), #f9fafb 70%);
  color: var(--color-text);
}

/* Utility-like classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.card {
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .6rem 1rem;
  border-radius: 12px;
  border: 1px solid transparent;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  transition: background var(--transition), box-shadow var(--transition), transform var(--transition);
  text-decoration: none;
  font-weight: 600;
}

.btn:hover {
  background: #1e4fd6;
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-secondary);
}

.btn-ghost {
  background: transparent;
  color: var(--color-primary);
  border-color: rgba(37, 99, 235, 0.25);
}

.input {
  width: 100%;
  padding: .7rem .9rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
  color: var(--color-text);
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
}

.input:focus {
  border-color: rgba(37,99,235,.6);
  box-shadow: 0 0 0 4px rgba(37,99,235,.15);
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #1e3a8a;
  font-size: .8rem;
  font-weight: 600;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: #fff7ed;
  color: #9a3412;
  font-size: .75rem;
  border: 1px solid #ffedd5;
}

hr.hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1rem 0;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
