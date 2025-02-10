import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import GroceriesPage from './views/GroceriesPage';
import NotFoundPage from './views/NotFoundPage';
import GroceryPage from './views/GroceryPage';
import ProductsPage from './views/ProductsPage';
import sagas from './sagas';

import reducers from './reducers';

const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
        {
            path: '/products',
            element: <ProductsPage />,
        },
        {
            path: '/groceries',
            element: <GroceriesPage />,
        },
        {
            path: '/groceries/:groceryId',
            element: <GroceryPage />,
        },
    ],
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);