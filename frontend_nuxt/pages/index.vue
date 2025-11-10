<template>
  <NuxtLayout name="with-sidebar">
    <template #sidebar>
      <CategoryFilter
        v-if="!loading"
        :categories="categories"
        v-model="selectedCategories"
      />
    </template>

    <section class="container">
      <div class="hero card">
        <div class="hero-inner">
          <div>
            <h1 class="h1">Discover delicious recipes</h1>
            <p class="lead">Browse curated recipes with a modern, ocean-inspired interface.</p>
          </div>
          <NuxtLink to="/categories" class="btn btn-secondary">Explore Categories</NuxtLink>
        </div>
      </div>

      <div class="controls">
        <SearchBar v-model="query" @clear="query=''" />
      </div>

      <RecipeGrid
        :recipes="filtered"
        :loading="loading"
        :error="!!error"
        :error-message="error || ''"
        @retry="reload"
      />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import SearchBar from '~/components/SearchBar.vue';
import RecipeGrid from '~/components/RecipeGrid.vue';
import CategoryFilter from '~/components/CategoryFilter.vue';
import { useRecipes } from '~/composables/useRecipes';

useHead({
  title: 'Recipe Explorer • Home',
  meta: [{ name: 'description', content: 'Browse and search recipes.' }],
});

const { recipes, categories, loading, error, load } = useRecipes();

const query = ref('');
const selectedCategories = ref<string[]>([]);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  const cats = new Set(selectedCategories.value);
  return recipes.value.filter(r => {
    const matchesQuery = !q || [
      r.title,
      r.description,
      ...(r.ingredients || []),
      ...(r.categories || []),
    ].some(s => String(s).toLowerCase().includes(q));

    const matchesCats = cats.size === 0 || (r.categories || []).some(c => cats.has(c));
    return matchesQuery && matchesCats;
  });
});

async function reload() {
  await load(true);
}

onMounted(() => {
  load();
});
</script>

<style scoped>
.hero {
  margin: 1rem 0 1.2rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(37,99,235,.08), #ffffff 70%);
  border: 1px solid #e5e7eb;
}
.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  flex-wrap: wrap;
}
.h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: .2px;
}
.lead {
  margin: .25rem 0 0;
  color: #4b5563;
}
.controls {
  margin: .5rem 0 1rem;
}
</style>
