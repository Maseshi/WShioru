import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

reportWebVitals()