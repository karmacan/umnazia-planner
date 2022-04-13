import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from 'components/App';
import {AppProvider} from 'store/AppProvider';

ReactDOM.render(
    <AppProvider>
      <App />
    </AppProvider>,
  document.getElementById('root')
);
