<template>
  <div>
    <section class="container">
      <NuxtLink class="btn btn-ghost" to="/">← Back</NuxtLink>

      <div v-if="loading" class="state">
        <span class="spinner" aria-hidden="true"></span>
        <span>Loading recipe...</span>
      </div>
      <div v-else-if="!recipe && !error" class="state">
        <span>Recipe not found.</span>
      </div>
      <div v-else-if="error" class="state error">
        <span>{{ error }}</span>
        <button class="btn btn-ghost" type="button" @click="reload">Retry</button>
      </div>
      <article v-else class="card detail">
        <div class="media">
          <img :src="recipe!.image" :alt="`${recipe!.title} image`" />
        </div>
        <div class="content">
          <h1 class="title">{{ recipe!.title }}</h1>
          <p class="desc">{{ recipe!.description }}</p>
          <div class="tags">
            <span v-for="c in recipe!.categories" :key="c" class="tag">#{{ c }}</span>
          </div>

          <div class="sections">
            <section>
              <h2>Ingredients</h2>
              <ul class="list">
                <li v-for="(i, idx) in recipe!.ingredients" :key="idx">{{ i }}</li>
              </ul>
            </section>
            <section>
              <h2>Instructions</h2>
              <ol class="steps">
                <li v-for="(s, idx) in recipe!.steps" :key="idx">{{ s }}</li>
              </ol>
            </section>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRecipes } from '~/composables/useRecipes';

useHead({ title: 'Recipe Explorer • Details' });

const route = useRoute();
const { byId, load, loading, error } = useRecipes();
const id = computed(() => route.params.id as string);
const recipe = computed(() => byId(id.value).value);

onMounted(() => {
  load();
});

async function reload() {
  await load(true);
}
</script>

<style scoped>
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

.detail {
  margin-top: 1rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #e5e7eb;
  overflow: hidden;
}
.media img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.content {
  padding: 1rem;
}
.title { margin: 0; font-size: 1.5rem; font-weight: 900; }
.desc { color: #4b5563; margin-top: .35rem; }
.tags { display: flex; gap: .4rem; flex-wrap: wrap; margin-top: .6rem; }

.sections {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
}
@media (min-width: 900px) {
  .sections { grid-template-columns: 1fr 1fr; }
}
.list {
  margin: .4rem 0 0 1rem;
}
.steps {
  margin: .4rem 0 0 1rem;
}
</style>
