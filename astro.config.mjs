import { defineConfig } from 'astro/config';
import auth from "auth-astro";
import node from "@astrojs/node";
import db from "@astrojs/db";
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [auth(), db(), react(), svelte()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});