# Ocean Professional UI Notes

- Primary `#2563EB`, Secondary/Success `#F59E0B`, Error `#EF4444`, Background `#f9fafb`, Surface `#ffffff`, Text `#111827`.
- Subtle gradient background from blue-500/10 to gray-50.
- Rounded corners, smooth transitions, and modest shadows.

Data fetching:
- The app reads `NUXT_PUBLIC_API_BASE` from public runtime config. If unset or the request fails, it falls back to local mock data inside `composables/useRecipes.ts`.
- TODO: Replace the mock with real API endpoints `/recipes` and `/categories` when backend is available.
