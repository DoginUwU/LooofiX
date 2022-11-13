import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)

postMessage({ payload: 'removeLoading' }, '*')
