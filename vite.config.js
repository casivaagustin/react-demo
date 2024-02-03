import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    // Add the following lines for more react-refresh logging
  logLevel: 'error', // Adjust the log level as needed ('info', 'warn', 'error', etc.)
  clearScreen: false, // Set to true if you want to clear the console on every rebuild
})
