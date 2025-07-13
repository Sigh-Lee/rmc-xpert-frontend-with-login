# vite.config.js
vite_config_content = """
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});
"""
(frontend_path / "vite.config.js").write_text(vite_config_content.strip())
