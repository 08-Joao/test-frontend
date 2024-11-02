import { createRoot } from 'react-dom/client'
import './styles/Global.css'
import Routes from './routes'

createRoot(document.getElementById('root')!).render(
  <Routes />
)
