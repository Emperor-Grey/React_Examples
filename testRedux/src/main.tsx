import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import Counter from './components/Counter';
import './index.css';
import { store } from './state/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Counter />
    </ReduxProvider>
  </StrictMode>
);
