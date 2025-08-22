import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoyaltyDashboard from './LoyaltyDashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoyaltyDashboard/>
  </StrictMode>,
)
