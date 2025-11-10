<template>
  <form class="search card" role="search" @submit.prevent>
    <label class="sr-only" for="search">Search recipes</label>
    <div class="row">
      <input
        id="search"
        class="input"
        type="search"
        :value="modelValue"
        placeholder="Search recipes by name, ingredient, or tag..."
        autocomplete="off"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        aria-label="Search recipes"
      />
      <button class="btn btn-ghost" type="button" @click="$emit('clear')" aria-label="Clear search">
        Clear
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>();
defineEmits(['update:modelValue', 'clear']);
</script>

<style scoped>
.search {
  padding: .8rem;
}
.row {
  display: flex;
  gap: .6rem;
}
.sr-only {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden; clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; border: 0; padding: 0; margin: -1px;
}
</style>
