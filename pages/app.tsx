import ReactDOM from 'react-dom/client';
import React from 'react'
import '../styles/globals.scss'
import '../styles/animation.scss'
import Home from "./index"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
