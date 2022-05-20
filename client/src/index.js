import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProviderWrapper } from './context/theme.context'
import { ToastProvider } from './context/toast.context'

ReactDOM.render(
  <Router>
    <ThemeProviderWrapper>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProviderWrapper>
  </Router>,
  document.getElementById('root')
)

