/**
 * Shared flat ESLint config for the monorepo apps and packages.
 * Keeps defaults minimal to avoid fighting framework presets.
 */
export default [
  {
    ignores: ["**/dist/**", "**/build/**", "**/.next/**", "**/node_modules/**"],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {},
  },
];
