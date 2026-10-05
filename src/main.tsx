import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGlobalButtonSounds } from './utils/sound.ts';
import { LanguageProvider } from './context/LanguageContext.tsx';

initGlobalButtonSounds();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

