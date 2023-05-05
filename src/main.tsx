import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'normalize.css'
import './styles/main.css'
import './styles/sandpack.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
