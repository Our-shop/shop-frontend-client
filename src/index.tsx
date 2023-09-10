import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// themes
import { ThemeProvider } from '@mui/material';
import themes from './themes';

//i18n
import './resources/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={themes}>
    <App />
  </ThemeProvider>,
);

serviceWorkerRegistration.register();
