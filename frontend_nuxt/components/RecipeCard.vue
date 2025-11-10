<template>
  <article class="card recipe" :aria-label="recipe.title">
    <NuxtLink class="thumb" :to="`/recipes/${recipe.id}`" :aria-label="`View ${recipe.title}`">
      <img :src="recipe.image" :alt="`${recipe.title} image`" loading="lazy" />
    </NuxtLink>
    <div class="body">
      <NuxtLink class="title" :to="`/recipes/${recipe.id}`">{{ recipe.title }}</NuxtLink>
      <p class="desc">{{ recipe.description }}</p>
      <div class="meta">
        <span v-for="c in recipe.categories" :key="c" class="badge" :title="c">#{{ c }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
export type RecipeCardModel = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  categories: string[];
}

defineProps<{
  recipe: RecipeCardModel
}>();
</script>

<style scoped>
.recipe {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.thumb {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #e5e7eb;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}
.thumb:hover img {
  transform: scale(1.03);
}
.body {
  padding: .8rem .9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.title {
  font-weight: 800;
  color: var(--color-text);
  text-decoration: none;
  line-height: 1.25;
}
.desc {
  color: #4b5563;
  margin: 0;
  font-size: .95rem;
}
.meta {
  display: flex;
  gap: .4rem;
  flex-wrap: wrap;
  margin-top: .3rem;
}
</style>
