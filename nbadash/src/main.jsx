import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Header from './routes/Header'
import DetailsPage from './routes/DetailsPage'
import NotFoundPage from './routes/NotFound'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index={true} element={<App />}/>
          <Route index={false} path='/gameDetails/:id' element={<DetailsPage/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} /> {/* Fallback route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
