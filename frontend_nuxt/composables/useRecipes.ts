import { ref, computed } from 'vue';

export type Recipe = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  categories: string[];
  ingredients: string[];
  steps: string[];
};

// PUBLIC_INTERFACE
export function useRecipes() {
  /**
   * This composable provides recipe and category data with caching.
   * It tries to fetch from NUXT_PUBLIC_API_BASE if defined, falling back to local mock data.
   * TODO: Replace mock implementation with real API once backend is available.
   */
  const apiBase = useRuntimeConfig().public?.apiBase as string | undefined;

  const recipes = ref<Recipe[]>([]);
  const categories = ref<string[]>([]);
  const loaded = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchFromApi() {
    const base = apiBase?.replace(/\/+$/, '');
    if (!base) throw new Error('API base not configured');
    const [recipesRes, categoriesRes] = await Promise.all([
      $fetch<Recipe[]>(`${base}/recipes`),
      $fetch<string[]>(`${base}/categories`),
    ]);
    return { recipes: recipesRes, categories: categoriesRes };
  }

  async function fetchFromMock() {
    // Local mock data (kept in this file for simplicity). Could move to data/mock.ts if preferred.
    const mock: Recipe[] = [
      {
        id: '1',
        title: 'Lemon Herb Grilled Chicken',
        description: 'Juicy grilled chicken marinated with lemon and herbs.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop',
        categories: ['Grill', 'Dinner', 'Chicken'],
        ingredients: [
          '4 chicken breasts',
          '2 lemons (juice + zest)',
          '2 tbsp olive oil',
          '3 garlic cloves, minced',
          '1 tsp dried oregano',
          '1 tsp dried thyme',
          'Salt & pepper to taste',
        ],
        steps: [
          'Whisk lemon juice, zest, olive oil, garlic, oregano, thyme, salt, and pepper.',
          'Marinate chicken for at least 30 minutes (up to 4 hours).',
          'Grill over medium-high heat 5–7 minutes per side until cooked through.',
          'Rest for 5 minutes, then serve.',
        ],
      },
      {
        id: '2',
        title: 'Creamy Tomato Pasta',
        description: 'A comforting pasta with a creamy tomato sauce.',
        image: 'https://images.unsplash.com/photo-1526312426976-593c2b999adb?q=80&w=1600&auto=format&fit=crop',
        categories: ['Pasta', 'Vegetarian', 'Quick'],
        ingredients: [
          '250g pasta',
          '1 cup tomato puree',
          '1/2 cup heavy cream',
          '2 cloves garlic',
          '2 tbsp olive oil',
          'Salt, pepper, basil',
        ],
        steps: [
          'Cook pasta al dente.',
          'Sauté garlic in olive oil, add tomato puree and simmer.',
          'Stir in cream, season, and toss with pasta. Garnish with basil.',
        ],
      },
      {
        id: '3',
        title: 'Avocado Toast Deluxe',
        description: 'Creamy avocado on toasted bread with toppings.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop',
        categories: ['Breakfast', 'Vegetarian', 'Quick'],
        ingredients: [
          '2 slices sourdough',
          '1 ripe avocado',
          'Salt, pepper, chili flakes',
          'Lemon juice',
          'Olive oil',
        ],
        steps: [
          'Toast bread. Mash avocado with lemon, salt, and pepper.',
          'Spread on toast, drizzle olive oil, top with chili flakes.',
        ],
      },
    ];
    const cat = Array.from(new Set(mock.flatMap(r => r.categories))).sort();
    await new Promise(r => setTimeout(r, 300)); // small delay to mimic network
    return { recipes: mock, categories: cat };
  }

  // PUBLIC_INTERFACE
  async function load(force = false) {
    /** Load recipes and categories. If already loaded and not forced, returns cached. */
    if (loaded.value && !force) return;
    error.value = null;
    loading.value = true;
    try {
      const data = await (apiBase ? fetchFromApi() : fetchFromMock());
      recipes.value = data.recipes;
      categories.value = data.categories;
      loaded.value = true;
    } catch (e: any) {
      // On API failure, try mock as graceful fallback.
      try {
        const data = await fetchFromMock();
        recipes.value = data.recipes;
        categories.value = data.categories;
        loaded.value = true;
        error.value = 'Using local sample data because API is unavailable.';
      } catch (mockErr: any) {
        error.value = mockErr?.message || 'Failed to load data.';
      }
    } finally {
      loading.value = false;
    }
  }

  const byId = (id: string | number) => computed(() => recipes.value.find(r => String(r.id) === String(id)) || null);

  return {
    recipes,
    categories,
    loaded,
    loading,
    error,
    load,
    byId,
  };
}
