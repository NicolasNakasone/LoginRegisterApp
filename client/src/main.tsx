import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'src/App'

import 'src/style.css'

createRoot(document.getElementById('app')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
