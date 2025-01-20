// vite.config.js
import { defineConfig } from "file:///mnt/c/Users/boutt/Documents/Projects/Anchor/react-vite/node_modules/vite/dist/node/index.js";
import eslintPlugin from "file:///mnt/c/Users/boutt/Documents/Projects/Anchor/react-vite/node_modules/vite-plugin-eslint/dist/index.mjs";
import react from "file:///mnt/c/Users/boutt/Documents/Projects/Anchor/react-vite/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  server: {
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:8000"
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvYm91dHQvRG9jdW1lbnRzL1Byb2plY3RzL0FuY2hvci9yZWFjdC12aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvYm91dHQvRG9jdW1lbnRzL1Byb2plY3RzL0FuY2hvci9yZWFjdC12aXRlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9Vc2Vycy9ib3V0dC9Eb2N1bWVudHMvUHJvamVjdHMvQW5jaG9yL3JlYWN0LXZpdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKG1vZGUpID0+ICh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGVzbGludFBsdWdpbih7XG4gICAgICBsaW50T25TdGFydDogdHJ1ZSxcbiAgICAgIGZhaWxPbkVycm9yOiBtb2RlID09PSBcInByb2R1Y3Rpb25cIixcbiAgICB9KSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwXCIsXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxvQkFBb0I7QUFDcFgsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYSxDQUFDLFVBQVU7QUFBQSxFQUNyQyxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixhQUFhLFNBQVM7QUFBQSxJQUN4QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
