import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([".astro/", "dist/"]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
);
