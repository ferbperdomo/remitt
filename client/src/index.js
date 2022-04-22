import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProviderWrapper } from '././context/theme.context'


ReactDOM.render(
  <Router>
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>

  </Router>,
  document.getElementById('root')
)

