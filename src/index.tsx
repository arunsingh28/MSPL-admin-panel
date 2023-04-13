import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './store/store'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// disable devtools in production uncomment it if you want to disable devtools
// disableReactDevTools();


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <ToastContainer />
      <App />
    </Router>
    </Provider>
  </React.StrictMode>
);
