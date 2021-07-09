import React from 'react';
import ReactDOM from 'react-dom';
import AddServiceProvider from './context/addServiceContext';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
  <AddServiceProvider>
    <App />
  </AddServiceProvider>
</React.StrictMode>,
  document.getElementById('root')
);
