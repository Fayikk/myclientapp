import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Container/App';
import { Provider } from 'react-redux';
import { store } from './Storage';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store} >
      <BrowserRouter>
      <ToastContainer></ToastContainer>

    <App />


      </BrowserRouter>
      
    </Provider>


    );
