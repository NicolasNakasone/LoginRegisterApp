import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'src/App'
import { UserProvider } from 'src/contexts/UserProvider'

import 'src/style.css'

createRoot(document.getElementById('app')!).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
)
