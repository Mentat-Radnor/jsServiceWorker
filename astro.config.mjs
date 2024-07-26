import { defineConfig } from 'astro/config';
// import serviceWorker from "astrojs-service-worker";

// https://astro.build/config
export default defineConfig({
  // не понимаю, зачем нужно устаналивать таким способом, если можно нормально все сделать
  // integrations: [serviceWorker({
  //   workbox: { inlineWorkboxRuntime: true },
  //   enableInDevelopment: true,
  // })],
  vite: {
    resolve: { alias: { '@': '/src' } },
  },
});
