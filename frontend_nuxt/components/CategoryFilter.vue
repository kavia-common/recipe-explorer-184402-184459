<template>
  <section>
    <header class="head">
      <h2 class="title">Categories</h2>
      <button class="btn btn-ghost" type="button" @click="clear" aria-label="Clear category filter">Reset</button>
    </header>

    <div class="list">
      <button
        v-for="cat in categories"
        :key="cat"
        class="chip"
        :class="{ active: modelValue?.includes(cat) }"
        type="button"
        @click="toggle(cat)"
        :aria-pressed="modelValue?.includes(cat) ? 'true' : 'false'"
      >
        {{ cat }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  categories: string[],
  modelValue: string[]
}>();
const emit = defineEmits(['update:modelValue']);

function toggle(cat: string) {
  const set = new Set(props.modelValue || []);
  if (set.has(cat)) set.delete(cat);
  else set.add(cat);
  emit('update:modelValue', Array.from(set));
}

function clear() {
  emit('update:modelValue', []);
}
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
}
.title {
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0;
}
.list {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}
.chip {
  padding: .35rem .7rem;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition), color var(--transition), transform var(--transition);
}
.chip:hover {
  transform: translateY(-1px);
  border-color: rgba(37,99,235,.5);
}
.chip.active {
  background: rgba(37,99,235,.08);
  border-color: rgba(37,99,235,.5);
  color: #1e40af;
}
</style>
