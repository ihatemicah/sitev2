import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ExperimentsPage from './experiments/ExperimentsPage.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ExperimentsPage />
    </StrictMode>,
)
