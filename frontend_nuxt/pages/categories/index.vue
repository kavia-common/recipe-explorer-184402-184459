<template>
  <NuxtLayout name="with-sidebar">
    <template #sidebar>
      <CategoryFilter
        v-if="!loading"
        :categories="categories"
        v-model="selected"
      />
    </template>

    <section class="container">
      <header class="header">
        <h1 class="h1">Categories</h1>
        <NuxtLink class="btn btn-ghost" to="/">Back to Home</NuxtLink>
      </header>

      <div class="grid">
        <NuxtLink
          v-for="cat in categories"
          :key="cat"
          class="card item"
          :class="{ active: selected.includes(cat) }"
          to="/"
          @click.prevent="toggle(cat)"
        >
          <span class="label">#{{ cat }}</span>
        </NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import CategoryFilter from '~/components/CategoryFilter.vue';
import { useRecipes } from '~/composables/useRecipes';

useHead({ title: 'Recipe Explorer • Categories' });

const { categories, load, loading } = useRecipes();
const selected = ref<string[]>([]);

onMounted(() => {
  load();
});

function toggle(c: string) {
  const set = new Set(selected.value);
  if (set.has(c)) set.delete(c); else set.add(c);
  selected.value = Array.from(set);
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  margin-top: 1rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .9rem;
  margin-top: 1rem;
}
@media (min-width: 720px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
.item {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  transition: transform var(--transition), border-color var(--transition), background var(--transition);
}
.item:hover {
  transform: translateY(-2px);
  border-color: rgba(37,99,235,.5);
}
.item.active {
  background: rgba(37,99,235,.05);
  border-color: rgba(37,99,235,.6);
}
.label { font-weight: 800; color: #1f2937; }
.h1 { margin: 0; font-size: 1.4rem; font-weight: 900; }
</style>
