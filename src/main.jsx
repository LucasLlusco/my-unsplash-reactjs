import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GalleryContextProvider } from './context/galleryContext'
import './styles.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GalleryContextProvider>
      <App />
    </GalleryContextProvider>
  </React.StrictMode>
)
