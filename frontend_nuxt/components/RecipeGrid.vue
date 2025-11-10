<template>
  <section aria-label="Recipes list">
    <div v-if="loading" class="state">
      <span class="spinner" aria-hidden="true"></span>
      <span>Loading recipes...</span>
    </div>

    <div v-else-if="error" class="state error">
      <span>We couldn't load recipes. {{ errorMessage }}</span>
      <button class="btn btn-ghost" type="button" @click="$emit('retry')">Retry</button>
    </div>

    <div v-else>
      <div v-if="recipes.length === 0" class="state">
        <span>No recipes found. Try adjusting your search or filters.</span>
      </div>
      <div class="grid">
        <RecipeCard v-for="r in recipes" :key="r.id" :recipe="r" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import RecipeCard from './RecipeCard.vue';

defineProps<{
  recipes: any[],
  loading?: boolean,
  error?: boolean,
  errorMessage?: string
}>();
defineEmits(['retry']);
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 560px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 980px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.state {
  display: flex;
  align-items: center;
  gap: .6rem;
  color: #4b5563;
  padding: 1rem 0;
}
.state.error { color: #9b1c1c; }
.spinner {
  width: 16px; height: 16px; border-radius: 50%;
  border: 3px solid rgba(37,99,235,.25);
  border-top-color: var(--color-primary);
  animation: spin 900ms linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
