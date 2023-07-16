import { render } from 'preact'
import App from './App'
import './styles/globals.scss'

render(<App />, document.getElementById('root')!)

postMessage({ payload: 'removeLoading' }, '*')
