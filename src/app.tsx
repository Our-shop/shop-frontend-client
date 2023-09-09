import React, { useEffect } from 'react';
import './app.css';
import ErrorBoundaryComp from './components/error-boundary.comp';

// app router
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app.routes';

// store
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;
