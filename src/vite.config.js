import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
// https://vitejs.dev/config/
export default defineConfig({
  base: '/personal-pick/', // 예시: 저장소 이름이 my-react-app 이면 /my-react-app/
  plugins: [react()],
});