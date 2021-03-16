import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';
import reportWebVitals from 'reportWebVitals';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onSuccess: () => {
    const notyf = new Notyf({
      duration: 3000,
      position: { x: 'center', y: 'bottom' },
      dismissible: true,
    });
    notyf.success(
      'Votre application peut désormais être utilisée en mode hors-ligne !',
    );
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
